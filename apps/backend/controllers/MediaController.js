import mediaService from '../services/MediaService.js';
import { sanitizeError, logError } from '../utils/errorHandler.js';

class MediaController {
  /**
   * Upload media file
   * POST /api/media/upload/:type
   */
  async uploadMedia(req, res) {
    try {
      const { type } = req.params;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: 'No file provided' });
      }

      const result = await mediaService.uploadMedia(type, file);
      res.json({
        success: true,
        message: 'File uploaded successfully',
        media: result
      });
    } catch (error) {
      logError('MediaController.uploadMedia', error);
      res.status(400).json({ error: sanitizeError(error) });
    }
  }

  /**
   * Get media by type
   * GET /api/media/:type
   */
  async getMedia(req, res) {
    try {
      const { type } = req.params;
      const media = await mediaService.getMedia(type);
      
      if (!media) {
        return res.json({ url: null, type });
      }
      
      res.json(media);
    } catch (error) {
      logError('MediaController.getMedia', error);
      res.status(400).json({ error: sanitizeError(error) });
    }
  }

  /**
   * Get all media
   * GET /api/media/all
   */
  async getAllMedia(req, res) {
    try {
      const media = await mediaService.getAllMedia();
      res.json(media);
    } catch (error) {
      logError('MediaController.getAllMedia', error);
      res.status(500).json({ error: sanitizeError(error) });
    }
  }

  /**
   * Delete media by type
   * DELETE /api/media/:type
   */
  async deleteMedia(req, res) {
    try {
      const { type } = req.params;
      const deleted = await mediaService.deleteMedia(type);
      
      if (!deleted) {
        return res.status(404).json({ error: 'Media not found' });
      }
      
      res.json({
        success: true,
        message: 'Media deleted successfully',
        deleted
      });
    } catch (error) {
      logError('MediaController.deleteMedia', error);
      res.status(400).json({ error: sanitizeError(error) });
    }
  }

  /**
   * Get app projects
   * GET /api/media/projects
   */
  async getAppProjects(req, res) {
    try {
      const projects = await mediaService.getAppProjects();
      res.json(projects);
    } catch (error) {
      logError('MediaController.getAppProjects', error);
      res.status(500).json({ error: sanitizeError(error) });
    }
  }

  /**
   * Update app projects (replace all)
   * PUT /api/media/projects
   */
  async updateAppProjects(req, res) {
    try {
      const { projects } = req.body;
      const updated = await mediaService.updateAppProjects(projects);
      res.json({
        success: true,
        message: 'Projects updated successfully',
        projects: updated
      });
    } catch (error) {
      logError('MediaController.updateAppProjects', error);
      res.status(400).json({ error: sanitizeError(error) });
    }
  }

  /**
   * Add app project
   * POST /api/media/projects
   */
  async addAppProject(req, res) {
    try {
      const project = await mediaService.addAppProject(req.body);
      res.json({
        success: true,
        message: 'Project added successfully',
        project
      });
    } catch (error) {
      logError('MediaController.addAppProject', error);
      res.status(400).json({ error: sanitizeError(error) });
    }
  }

  /**
   * Delete app project
   * DELETE /api/media/projects/:id
   */
  async deleteAppProject(req, res) {
    try {
      const { id } = req.params;
      const deleted = await mediaService.deleteAppProject(parseInt(id));
      
      if (!deleted) {
        return res.status(404).json({ error: 'Project not found' });
      }
      
      res.json({
        success: true,
        message: 'Project deleted successfully',
        deleted
      });
    } catch (error) {
      logError('MediaController.deleteAppProject', error);
      res.status(400).json({ error: sanitizeError(error) });
    }
  }

  /**
   * Get valid media types
   * GET /api/media/types
   */
  async getMediaTypes(req, res) {
    try {
      const types = mediaService.getValidMediaTypes();
      res.json(types);
    } catch (error) {
      logError('MediaController.getMediaTypes', error);
      res.status(500).json({ error: sanitizeError(error) });
    }
  }
}

export default new MediaController();
