import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Video } from 'lucide-react';
import { cn } from '@/lib/utils';

function VideoPlayer({
  src,
  title,
  description,
  poster,
  className,
  showPlaceholder = true,
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  // Placeholder when no video
  if (!src && showPlaceholder) {
    return (
      <div className={cn('relative', className)}>
        {title && (
          <h3 className="text-xl font-semibold text-gray-200 mb-3">{title}</h3>
        )}
        <div className="aspect-video bg-dark-300/50 rounded-xl border border-gray-700/50 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-dark-400/50 flex items-center justify-center mb-4">
            <Video className="w-8 h-8 text-gray-500" />
          </div>
          <p className="text-gray-400">Video coming soon</p>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
      </div>
    );
  }

  if (!src) return null;

  return (
    <div className={cn('relative', className)}>
      {title && (
        <h3 className="text-xl font-semibold text-gray-200 mb-3">{title}</h3>
      )}
      
      <div
        className="relative aspect-video bg-black rounded-xl overflow-hidden group"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="w-full h-full object-contain"
          onEnded={handleVideoEnd}
          onClick={togglePlay}
          playsInline
        />

        {/* Play button overlay (when paused) */}
        {!isPlaying && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center bg-black/30"
            onClick={togglePlay}
          >
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
              <Play className="w-10 h-10 text-white ml-1" fill="white" />
            </div>
          </motion.button>
        )}

        {/* Controls bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showControls || !isPlaying ? 1 : 0, y: 0 }}
          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                )}
              </button>
              
              <button
                onClick={toggleMute}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>
            </div>

            <button
              onClick={toggleFullscreen}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <Maximize className="w-5 h-5 text-white" />
            </button>
          </div>
        </motion.div>
      </div>

      {description && (
        <p className="text-gray-400 mt-3">{description}</p>
      )}
    </div>
  );
}

export default VideoPlayer;
