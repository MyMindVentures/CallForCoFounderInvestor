import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Loader2, CheckCircle, AlertCircle, Image, Video, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { assets } from '@/utils/assets';

const FILE_SIZE_LIMITS = {
  video: 200 * 1024 * 1024, // 200MB
  image: 10 * 1024 * 1024,  // 10MB
  text: 512 * 1024, // 512KB
};

const ALLOWED_TYPES = {
  video: ['video/mp4', 'video/webm', 'video/quicktime'],
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  text: ['text/plain', 'text/markdown', 'text/x-markdown', 'application/octet-stream'],
};

const TEXT_EXTENSIONS = ['.mmd', '.mermaid', '.md', '.txt'];

const hasAllowedTextExtension = (filename = '') => {
  const lower = filename.toLowerCase();
  return TEXT_EXTENSIONS.some((ext) => lower.endsWith(ext));
};

function FileUpload({
  type = 'image', // 'image', 'video', or 'text'
  mediaType, // e.g., 'video-story', 'profile', 'mindmap'
  currentUrl = null,
  currentText = '',
  onUpload,
  onDelete,
  title,
  description,
  className,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(currentUrl);
  const [previewText, setPreviewText] = useState(currentText);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setPreviewUrl(currentUrl);
  }, [currentUrl]);

  useEffect(() => {
    setPreviewText(currentText);
  }, [currentText]);

  const validateFile = useCallback((file) => {
    if (!file) return { valid: false, error: 'No file selected' };

    const allowedTypes = ALLOWED_TYPES[type];
    if (type === 'text') {
      const isAllowedType = allowedTypes.includes(file.type);
      const isAllowedExtension = hasAllowedTextExtension(file.name);
      if (!isAllowedType && !isAllowedExtension) {
        return {
          valid: false,
          error: 'Invalid file type. Allowed: MMD, Mermaid, MD, TXT',
        };
      }
    } else if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `Invalid file type. Allowed: ${type === 'video' ? 'MP4, WebM, MOV' : 'JPG, PNG, GIF, WebP'}`,
      };
    }

    const maxSize = FILE_SIZE_LIMITS[type];
    if (file.size > maxSize) {
      const maxSizeMB = maxSize / (1024 * 1024);
      return {
        valid: false,
        error: `File too large. Maximum size: ${maxSizeMB}MB`,
      };
    }

    return { valid: true, error: null };
  }, [type]);

  const handleFile = useCallback(async (file) => {
    const validation = validateFile(file);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadProgress(0);

    // Create preview
    if (type === 'text') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewText(e.target.result);
      };
      reader.readAsText(file);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }

    // Simulate progress for UX
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    try {
      await onUpload(file, mediaType);
      
      setUploadProgress(100);
      
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    } catch (err) {
      setError(err.message || 'Upload failed');
      setIsUploading(false);
      setUploadProgress(0);
      setPreviewUrl(currentUrl);
      setPreviewText(currentText);
    } finally {
      clearInterval(progressInterval);
    }
  }, [validateFile, onUpload, mediaType, currentUrl, currentText, type]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleInputChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
    // Reset input so same file can be selected again
    e.target.value = '';
  }, [handleFile]);

  const handleDelete = useCallback(async () => {
    if (!onDelete) return;
    
    try {
      await onDelete(mediaType);
      setPreviewUrl(null);
      setPreviewText('');
      setError(null);
    } catch (err) {
      setError(err.message || 'Delete failed');
    }
  }, [onDelete, mediaType]);

  const Icon = type === 'video' ? Video : type === 'text' ? FileText : Image;
  const acceptTypes = type === 'text'
    ? `${TEXT_EXTENSIONS.join(',')},${ALLOWED_TYPES.text.join(',')}`
    : ALLOWED_TYPES[type].join(',');
  const hasPreview = type === 'text' ? !!previewText : !!previewUrl;

  return (
    <div className={cn('space-y-3', className)}>
      {title && (
        <div>
          <h4 className="font-semibold text-gray-200">{title}</h4>
          {description && (
            <p className="text-sm text-gray-400">{description}</p>
          )}
        </div>
      )}

      <div
        className={cn(
          'relative rounded-xl border-2 border-dashed transition-all duration-300',
          isDragging
            ? 'border-teal-400 bg-teal-500/10'
            : 'border-gray-600 hover:border-gray-500',
          isUploading && 'pointer-events-none opacity-75'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptTypes}
          onChange={handleInputChange}
          className="hidden"
          disabled={isUploading}
        />

        <AnimatePresence mode="wait">
          {hasPreview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative group"
            >
              {type === 'video' ? (
                <video
                  src={previewUrl}
                  className="w-full h-48 object-cover rounded-xl"
                  controls
                />
              ) : type === 'text' ? (
                <div className="w-full h-48 rounded-xl bg-dark-300/60 border border-white/10 p-4 overflow-auto">
                  <pre className="text-xs text-gray-200 whitespace-pre-wrap font-mono">
                    {previewText}
                  </pre>
                </div>
              ) : (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-xl"
                />
              )}
              
              {/* Overlay with actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-3">
                <Button
                  size="sm"
                  variant="glass"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Replace
                </Button>
                {onDelete && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isUploading}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative p-8 text-center cursor-pointer overflow-hidden"
              onClick={() => fileInputRef.current?.click()}
            >
              <img
                src={assets.components.fileUploadZone}
                alt=""
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10"
                aria-hidden="true"
              />
              <motion.div
                animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
                className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-dark-300/50 mb-4"
              >
                {isUploading ? (
                  <Loader2 className="w-8 h-8 text-teal-400 animate-spin" />
                ) : (
                  <Icon className="w-8 h-8 text-gray-400" />
                )}
              </motion.div>
              
              <p className="text-gray-300 font-medium mb-1">
                {isDragging ? 'Drop file here' : 'Drag & drop or click to upload'}
              </p>
              <p className="text-sm text-gray-500">
                {type === 'video' 
                  ? 'MP4, WebM, MOV (max 200MB)'
                  : type === 'text'
                    ? 'MMD, Mermaid, MD, TXT (max 512KB)'
                    : 'JPG, PNG, GIF, WebP (max 10MB)'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload progress */}
        {isUploading && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700 rounded-b-xl overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-500 to-cyan-500"
              initial={{ width: 0 }}
              animate={{ width: `${uploadProgress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        )}
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 text-red-400 text-sm"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success indicator */}
      <AnimatePresence>
        {uploadProgress === 100 && !error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 text-green-400 text-sm"
          >
            <CheckCircle className="w-4 h-4" />
            Upload complete!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FileUpload;
