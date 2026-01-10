import { useEffect, useRef, useState } from 'react';
import {
  Camera,
  Loader2,
  Pause,
  Play,
  RotateCcw,
  Square,
  Video
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const SPEED_OPTIONS = [
  { value: 0.5, label: '0.5x (Slow)' },
  { value: 0.8, label: '0.8x' },
  { value: 1, label: '1x (Normal)' },
  { value: 1.25, label: '1.25x' },
  { value: 1.5, label: '1.5x (Fast)' },
  { value: 2, label: '2x (Faster)' }
];

const getSupportedMimeType = () => {
  if (typeof MediaRecorder === 'undefined') {
    return null;
  }

  const types = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm',
    'video/mp4'
  ];

  return types.find((type) => MediaRecorder.isTypeSupported(type)) || null;
};

function VideoScriptRecorder({
  mediaType,
  script,
  onScriptSave,
  onUploadRecorded,
  title,
  description,
  className
}) {
  const [draft, setDraft] = useState(script || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [recordingError, setRecordingError] = useState('');
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);
  const [recordedPreviewUrl, setRecordedPreviewUrl] = useState('');
  const [cameraReady, setCameraReady] = useState(false);

  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const videoPreviewRef = useRef(null);
  const teleprompterRef = useRef(null);
  const scrollFrameRef = useRef(null);

  useEffect(() => {
    setDraft(script || '');
  }, [script]);

  useEffect(() => {
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (scrollFrameRef.current) {
        cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (recordedPreviewUrl) {
        URL.revokeObjectURL(recordedPreviewUrl);
      }
    };
  }, [recordedPreviewUrl]);

  useEffect(() => {
    if (!isScrolling) {
      if (scrollFrameRef.current) {
        cancelAnimationFrame(scrollFrameRef.current);
      }
      return;
    }

    const container = teleprompterRef.current;
    if (!container) {
      return;
    }

    let lastTime = performance.now();
    const baseSpeed = 40;

    const step = (time) => {
      const delta = time - lastTime;
      lastTime = time;
      container.scrollTop += (delta / 1000) * baseSpeed * scrollSpeed;
      if (container.scrollTop >= container.scrollHeight - container.clientHeight) {
        container.scrollTop = 0;
      }
      scrollFrameRef.current = requestAnimationFrame(step);
    };

    scrollFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (scrollFrameRef.current) {
        cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, [isScrolling, scrollSpeed, draft]);

  const ensureCameraReady = async () => {
    if (mediaStreamRef.current) {
      setCameraReady(true);
      return mediaStreamRef.current;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error('Camera access is not supported in this browser.');
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });

    mediaStreamRef.current = stream;
    setCameraReady(true);

    if (videoPreviewRef.current) {
      videoPreviewRef.current.srcObject = stream;
    }

    return stream;
  };

  const handleSaveScript = async () => {
    setIsSaving(true);
    setSaveMessage('');
    try {
      await onScriptSave(draft.trim());
      setSaveMessage('Script saved.');
    } catch (error) {
      setSaveMessage(error.message || 'Failed to save script.');
    } finally {
      setIsSaving(false);
    }
  };

  const startScrolling = () => {
    if (teleprompterRef.current) {
      teleprompterRef.current.scrollTop = 0;
    }
    setIsScrolling(true);
  };

  const stopScrolling = () => {
    setIsScrolling(false);
  };

  const handleStartRecording = async () => {
    setRecordingError('');
    setRecordedPreviewUrl('');

    try {
      const stream = await ensureCameraReady();
      const mimeType = getSupportedMimeType();
      if (!mimeType) {
        throw new Error('Recording is not supported in this browser.');
      }

      recordedChunksRef.current = [];
      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data?.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const recordedBlob = new Blob(recordedChunksRef.current, { type: mimeType });
        const previewUrl = URL.createObjectURL(recordedBlob);
        setRecordedPreviewUrl(previewUrl);

        const extension = mimeType.includes('mp4') ? 'mp4' : 'webm';
        const file = new File([recordedBlob], `${mediaType}-${Date.now()}.${extension}`, {
          type: recordedBlob.type
        });

        setIsUploading(true);
        try {
          await onUploadRecorded(file, mediaType);
        } catch (error) {
          setRecordingError(error.message || 'Upload failed.');
        } finally {
          setIsUploading(false);
        }
      };

      recorder.start();
      setIsRecording(true);
      startScrolling();
    } catch (error) {
      setRecordingError(error.message || 'Unable to start recording.');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    stopScrolling();
  };

  const handleToggleScroll = () => {
    if (isScrolling) {
      stopScrolling();
    } else {
      startScrolling();
    }
  };

  const handleResetScroll = () => {
    if (teleprompterRef.current) {
      teleprompterRef.current.scrollTop = 0;
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div>
        <h4 className="font-semibold text-gray-200">{title}</h4>
        {description && <p className="text-sm text-gray-400">{description}</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-4">
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-300">
            Video script (copy/paste)
          </label>
          <Textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Paste your script here..."
            className="min-h-[220px] font-mono"
          />
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleSaveScript} disabled={isSaving} size="sm">
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Script'
              )}
            </Button>
            {saveMessage && (
              <span className="text-xs text-gray-400 self-center">{saveMessage}</span>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="block text-sm font-semibold text-gray-300">Teleprompter view</label>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>Scroll speed</span>
              <select
                value={scrollSpeed}
                onChange={(event) => setScrollSpeed(Number(event.target.value))}
                className="rounded-lg border border-white/10 bg-dark-300/60 px-2 py-1 text-xs text-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
              >
                {SPEED_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-dark-300/70 p-3">
            <div
              ref={teleprompterRef}
              className="h-40 overflow-hidden text-sm text-gray-100 leading-relaxed"
            >
              {draft ? (
                <div className="whitespace-pre-wrap pr-2">{draft}</div>
              ) : (
                <p className="text-gray-500">Add a script to enable the teleprompter view.</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleScroll}
              disabled={!draft}
            >
              {isScrolling ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause Scroll
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Scroll
                </>
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleResetScroll} disabled={!draft}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-4">
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-300">Camera preview</label>
          <div className="rounded-xl border border-white/10 bg-dark-300/70 p-3">
            <video
              ref={videoPreviewRef}
              className="h-48 w-full rounded-lg object-cover"
              autoPlay
              muted
              playsInline
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={ensureCameraReady}
              disabled={cameraReady}
            >
              <Camera className="w-4 h-4 mr-2" />
              {cameraReady ? 'Camera Ready' : 'Enable Camera'}
            </Button>
            <Button
              size="sm"
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              disabled={isUploading}
            >
              {isRecording ? (
                <>
                  <Square className="w-4 h-4 mr-2" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Video className="w-4 h-4 mr-2" />
                  Record & Upload
                </>
              )}
            </Button>
            {isUploading && (
              <span className="text-xs text-gray-400 flex items-center">
                <Loader2 className="w-3 h-3 mr-1 animate-spin" /> Uploading...
              </span>
            )}
          </div>
          {recordingError && <p className="text-xs text-red-400">{recordingError}</p>}
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-300">Latest recording</label>
          <div className="rounded-xl border border-white/10 bg-dark-300/70 p-3">
            {recordedPreviewUrl ? (
              <video
                src={recordedPreviewUrl}
                className="h-48 w-full rounded-lg object-cover"
                controls
              />
            ) : (
              <p className="text-sm text-gray-500">Record a clip to preview it here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoScriptRecorder;
