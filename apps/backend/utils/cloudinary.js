import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { logError } from './errorHandler.js';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// File size limits in bytes
const FILE_SIZE_LIMITS = {
  video: 200 * 1024 * 1024, // 200MB
  image: 10 * 1024 * 1024,  // 10MB
};

// Allowed file types
const ALLOWED_TYPES = {
  video: ['video/mp4', 'video/webm', 'video/quicktime'],
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
};

/**
 * Upload a file to Cloudinary
 * @param {Buffer} fileBuffer - The file buffer
 * @param {string} resourceType - 'video' or 'image'
 * @param {string} folder - Folder name in Cloudinary
 * @param {string} publicId - Optional public ID for the file
 * @returns {Promise<Object>} - Cloudinary upload result
 */
export const uploadToCloudinary = (fileBuffer, resourceType, folder, publicId = null) => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      resource_type: resourceType,
      folder: `callforinvestor/${folder}`,
      ...(publicId && { public_id: publicId }),
    };

    // For videos, add transformation options
    if (resourceType === 'video') {
      uploadOptions.eager = [
        { streaming_profile: 'auto', format: 'mp4' }
      ];
      uploadOptions.eager_async = true;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
};

/**
 * Delete a file from Cloudinary
 * @param {string} publicId - The public ID of the file
 * @param {string} resourceType - 'video' or 'image'
 * @returns {Promise<Object>} - Cloudinary delete result
 */
export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    return result;
  } catch (error) {
    logError('CloudinaryService.deleteFromCloudinary', error);
    throw error;
  }
};

/**
 * Validate file type and size
 * @param {Object} file - The file object from multer
 * @param {string} type - 'video' or 'image'
 * @returns {Object} - { valid: boolean, error: string | null }
 */
export const validateFile = (file, type) => {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  const allowedTypes = ALLOWED_TYPES[type];
  if (!allowedTypes.includes(file.mimetype)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`,
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
};

/**
 * Check if Cloudinary is configured
 * @returns {boolean}
 */
export const isCloudinaryConfigured = () => {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};

export default {
  uploadToCloudinary,
  deleteFromCloudinary,
  validateFile,
  isCloudinaryConfigured,
  FILE_SIZE_LIMITS,
  ALLOWED_TYPES,
};
