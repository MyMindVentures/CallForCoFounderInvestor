import express from 'express';
import messageController from '../controllers/MessageController.js';
import { authenticateToken } from '../middleware/auth.js';
import { checkDatabase } from '../middleware/dbCheck.js';

const router = express.Router();

// Submit a support message
router.post('/', checkDatabase, (req, res) => messageController.createMessage(req, res));

// Get all messages (admin only)
router.get('/', authenticateToken, checkDatabase, (req, res) => messageController.getAllMessages(req, res));

// Get public curated messages
router.get('/public', checkDatabase, (req, res) => messageController.getPublicMessages(req, res));

// Curate a message (admin only)
router.put('/:id/curate', authenticateToken, checkDatabase, (req, res) => messageController.curateMessage(req, res));

export default router;
