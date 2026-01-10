import { useEffect, useState } from 'react';
import { Loader2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/input';
import { cn } from '@/lib/utils';

function VideoCaptionsEditor({
  title,
  subtitles,
  transcript,
  onSaveSubtitles,
  onSaveTranscript,
  className
}) {
  const [subtitlesDraft, setSubtitlesDraft] = useState(subtitles || '');
  const [transcriptDraft, setTranscriptDraft] = useState(transcript || '');
  const [isSavingSubtitles, setIsSavingSubtitles] = useState(false);
  const [isSavingTranscript, setIsSavingTranscript] = useState(false);

  useEffect(() => {
    setSubtitlesDraft(subtitles || '');
  }, [subtitles]);

  useEffect(() => {
    setTranscriptDraft(transcript || '');
  }, [transcript]);

  const handleSaveSubtitles = async () => {
    setIsSavingSubtitles(true);
    try {
      await onSaveSubtitles(subtitlesDraft.trim());
    } finally {
      setIsSavingSubtitles(false);
    }
  };

  const handleSaveTranscript = async () => {
    setIsSavingTranscript(true);
    try {
      await onSaveTranscript(transcriptDraft.trim());
    } finally {
      setIsSavingTranscript(false);
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div>
        <h4 className="font-semibold text-gray-200">{title} Captions</h4>
        <p className="text-sm text-gray-400">
          Paste WebVTT subtitles and a readable transcript for visitors.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-300">
            Subtitles (WebVTT)
          </label>
          <Textarea
            value={subtitlesDraft}
            onChange={(event) => setSubtitlesDraft(event.target.value)}
            className="min-h-[180px] font-mono"
            placeholder="WEBVTT\n\n00:00:00.000 --> 00:00:05.000\nSubtitle text..."
          />
          <Button onClick={handleSaveSubtitles} disabled={isSavingSubtitles} size="sm">
            {isSavingSubtitles ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Subtitles
              </>
            )}
          </Button>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-300">Transcript</label>
          <Textarea
            value={transcriptDraft}
            onChange={(event) => setTranscriptDraft(event.target.value)}
            className="min-h-[180px]"
            placeholder="Paste the full transcript here..."
          />
          <Button onClick={handleSaveTranscript} disabled={isSavingTranscript} size="sm">
            {isSavingTranscript ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Transcript
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default VideoCaptionsEditor;
