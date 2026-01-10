import express from 'express';
import commentController from '../controllers/CommentController.js';
import { authenticateToken } from '../middleware/auth.js';
import { checkDatabase } from '../middleware/dbCheck.js';

const router = express.Router();

// Submit a storytelling comment
router.post('/', checkDatabase, (req, res) => commentController.createComment(req, res));

// Get all comments (admin only)
router.get('/', authenticateToken, checkDatabase, (req, res) => commentController.getAllComments(req, res));

// Get public comments
router.get('/public', checkDatabase, (req, res) => commentController.getPublicComments(req, res));

// Curate a comment (admin only)
router.put('/:id/curate', authenticateToken, checkDatabase, (req, res) => commentController.curateComment(req, res));

export default router;
