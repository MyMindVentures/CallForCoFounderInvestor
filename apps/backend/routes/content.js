import express from 'express';
import contentController from '../controllers/ContentController.js';
import { authenticateToken } from '../middleware/auth.js';
import { checkDatabase } from '../middleware/dbCheck.js';

const router = express.Router();

const protectedPageIds = [
  'video-script-story',
  'video-script-proposal',
  'video-script-proof'
];

// Get content for protected pages (admin only)
protectedPageIds.forEach((pageId) => {
  router.get(`/${pageId}`, authenticateToken, (req, res) => contentController.getContent(req, res));
});

// Get content for a page
router.get('/:pageId', (req, res) => contentController.getContent(req, res));

// Update content (admin only)
router.put('/:pageId', authenticateToken, checkDatabase, (req, res) => contentController.updateContent(req, res));

export default router;
