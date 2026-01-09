import contentService from '../services/ContentService.js';
import { sanitizeError, logError } from '../utils/errorHandler.js';

class ContentController {
  async getContent(req, res) {
    try {
      const content = await contentService.getContent(req.params.pageId);
      res.json(content);
    } catch (error) {
      logError('ContentController.getContent', error);
      // On error, return default content instead of failing
      res.json({
        pageId: req.params.pageId,
        content: contentService.getDefaultContent(req.params.pageId),
        lastUpdated: new Date().toISOString(),
        updatedBy: 'system',
        error: 'Database unavailable, showing default content'
      });
    }
  }

  async updateContent(req, res) {
    try {
      const updatedContent = await contentService.updateContent(
        req.params.pageId,
        req.body,
        req.user.username
      );
      res.json(updatedContent);
    } catch (error) {
      logError('ContentController.updateContent', error);
      res.status(500).json({ error: sanitizeError(error) });
    }
  }
}

export default new ContentController();
