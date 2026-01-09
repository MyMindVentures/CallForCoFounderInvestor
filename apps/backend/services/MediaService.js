import { mediaRepository, appProjectsRepository } from '../repositories/MediaRepository.js';
import { uploadToCloudinary, deleteFromCloudinary, validateFile, isCloudinaryConfigured } from '../utils/cloudinary.js';
import { logError } from '../utils/errorHandler.js';

// Valid media types
const VALID_MEDIA_TYPES = {
  'video-story': 'video',
  'video-proposal': 'video',
  'video-proof': 'video',
  'profile': 'image',
  'mindmap': 'image'
};

class MediaService {
  /**
   * Upload a media file
   * @param {string} type - Media type (video-story, video-proposal, video-proof, profile, mindmap)
   * @param {Object} file - Multer file object
   * @returns {Promise<Object>} - Uploaded media record
   */
  async uploadMedia(type, file) {
    // Validate media type
    const resourceType = VALID_MEDIA_TYPES[type];
    if (!resourceType) {
      throw new Error(`Invalid media type: ${type}. Valid types: ${Object.keys(VALID_MEDIA_TYPES).join(', ')}`);
    }

    // Check Cloudinary configuration
    if (!isCloudinaryConfigured()) {
      throw new Error('Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables.');
    }

    // Validate file
    const validation = validateFile(file, resourceType);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Check if existing media exists (for cleanup)
    const existing = await mediaRepository.findByType(type);

    // Upload to Cloudinary
    const folder = resourceType === 'video' ? 'videos' : 'images';
    const result = await uploadToCloudinary(file.buffer, resourceType, folder, type);

    // Delete old file from Cloudinary if exists
    if (existing && existing.publicId) {
      try {
        await deleteFromCloudinary(existing.publicId, resourceType);
      } catch (error) {
        logError('MediaService.uploadMedia - Delete Old File', error);
        // Continue even if delete fails
      }
    }

    // Save to database
    const mediaData = {
      cloudinaryId: result.asset_id,
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format
    };

    return await mediaRepository.upsert(type, mediaData);
  }

  /**
   * Get media by type
   * @param {string} type - Media type
   * @returns {Promise<Object|null>} - Media record or null
   */
  async getMedia(type) {
    if (!VALID_MEDIA_TYPES[type]) {
      throw new Error(`Invalid media type: ${type}`);
    }
    return await mediaRepository.findByType(type);
  }

  /**
   * Get all media
   * @returns {Promise<Object>} - Object with all media organized by type
   */
  async getAllMedia() {
    const allMedia = await mediaRepository.findAll();
    
    // Organize by type
    const result = {};
    for (const type of Object.keys(VALID_MEDIA_TYPES)) {
      const media = allMedia.find(m => m.type === type);
      result[type] = media || null;
    }
    
    return result;
  }

  /**
   * Delete media by type
   * @param {string} type - Media type
   * @returns {Promise<Object|null>} - Deleted media record or null
   */
  async deleteMedia(type) {
    const resourceType = VALID_MEDIA_TYPES[type];
    if (!resourceType) {
      throw new Error(`Invalid media type: ${type}`);
    }

    const existing = await mediaRepository.findByType(type);
    if (!existing) {
      return null;
    }

    // Delete from Cloudinary
    if (existing.publicId) {
      try {
        await deleteFromCloudinary(existing.publicId, resourceType);
      } catch (error) {
        logError('MediaService.deleteMedia - Cloudinary', error);
      }
    }

    // Delete from database
    return await mediaRepository.delete(type);
  }

  /**
   * Get all app projects
   * @returns {Promise<Array>} - List of app projects
   */
  async getAppProjects() {
    return await appProjectsRepository.findAll();
  }

  /**
   * Update app projects (replace all)
   * @param {Array} projects - Array of project objects { name, url, description }
   * @returns {Promise<Array>} - Updated list of projects
   */
  async updateAppProjects(projects) {
    // Validate projects
    if (!Array.isArray(projects)) {
      throw new Error('Projects must be an array');
    }

    if (projects.length > 3) {
      throw new Error('A maximum of 3 projects are allowed');
    }

    for (const project of projects) {
      if (!project.name || !project.url) {
        throw new Error('Each project must have a name and url');
      }
    }

    return await appProjectsRepository.replaceAll(projects);
  }

  /**
   * Add a single app project
   * @param {Object} project - Project object { name, url, description }
   * @returns {Promise<Object>} - Created project
   */
  async addAppProject(project) {
    if (!project.name || !project.url) {
      throw new Error('Project must have a name and url');
    }
    const existing = await appProjectsRepository.findAll();
    if (existing.length >= 3) {
      throw new Error('A maximum of 3 projects are allowed');
    }
    return await appProjectsRepository.create(project);
  }

  /**
   * Delete an app project
   * @param {number} id - Project ID
   * @returns {Promise<Object|null>} - Deleted project or null
   */
  async deleteAppProject(id) {
    return await appProjectsRepository.delete(id);
  }

  /**
   * Get valid media types
   * @returns {Object}
   */
  getValidMediaTypes() {
    return VALID_MEDIA_TYPES;
  }
}

export default new MediaService();
