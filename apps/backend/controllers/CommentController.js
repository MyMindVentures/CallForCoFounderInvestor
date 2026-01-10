import commentService from '../services/CommentService.js';
import { sanitizeError, logError } from '../utils/errorHandler.js';

class CommentController {
  async createComment(req, res) {
    try {
      const comment = await commentService.createComment(req.body);
      res.json(comment);
    } catch (error) {
      logError('CommentController.createComment', error);
      res.status(400).json({ error: sanitizeError(error) });
    }
  }

  async getAllComments(req, res) {
    try {
      const comments = await commentService.getAllComments();
      res.json(comments);
    } catch (error) {
      logError('CommentController.getAllComments', error);
      res.status(500).json({ error: sanitizeError(error) });
    }
  }

  async getPublicComments(req, res) {
    try {
      const comments = await commentService.getPublicComments(req.query.lang);
      res.json(comments);
    } catch (error) {
      logError('CommentController.getPublicComments', error);
      res.status(500).json({ error: sanitizeError(error) });
    }
  }

  async curateComment(req, res) {
    try {
      const comment = await commentService.curateComment(req.params.id, req.body);
      res.json(comment);
    } catch (error) {
      logError('CommentController.curateComment', error);
      res.status(500).json({ error: sanitizeError(error) });
    }
  }
}

export default new CommentController();
