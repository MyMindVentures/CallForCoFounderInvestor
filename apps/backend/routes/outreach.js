import express from 'express';
import outreachController from '../controllers/OutreachController.js';
import { authenticateToken } from '../middleware/auth.js';
import { checkDatabase } from '../middleware/dbCheck.js';

const router = express.Router();

router.get('/', authenticateToken, checkDatabase, (req, res) => outreachController.getAllOutreach(req, res));
router.post('/', authenticateToken, checkDatabase, (req, res) => outreachController.createOutreach(req, res));
router.put('/:id', authenticateToken, checkDatabase, (req, res) => outreachController.updateOutreach(req, res));
router.delete('/:id', authenticateToken, checkDatabase, (req, res) => outreachController.deleteOutreach(req, res));

export default router;
