import express from 'express';
import multer from 'multer';
import mediaController from '../controllers/MediaController.js';
import { authenticateToken } from '../middleware/auth.js';
import { checkDatabase } from '../middleware/dbCheck.js';

const router = express.Router();

// Configure multer for memory storage (for Cloudinary upload)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 200 * 1024 * 1024, // 200MB max
  },
});

// Public routes
router.get('/all', (req, res) => mediaController.getAllMedia(req, res));
router.get('/projects', (req, res) => mediaController.getAppProjects(req, res));
router.get('/types', (req, res) => mediaController.getMediaTypes(req, res));
router.get('/:type', (req, res) => mediaController.getMedia(req, res));

// Protected routes (admin only)
router.post(
  '/upload/:type',
  authenticateToken,
  checkDatabase,
  upload.single('file'),
  (req, res) => mediaController.uploadMedia(req, res)
);

router.delete(
  '/:type',
  authenticateToken,
  checkDatabase,
  (req, res) => mediaController.deleteMedia(req, res)
);

router.put(
  '/projects',
  authenticateToken,
  checkDatabase,
  (req, res) => mediaController.updateAppProjects(req, res)
);

router.post(
  '/projects',
  authenticateToken,
  checkDatabase,
  (req, res) => mediaController.addAppProject(req, res)
);

router.delete(
  '/projects/:id',
  authenticateToken,
  checkDatabase,
  (req, res) => mediaController.deleteAppProject(req, res)
);

export default router;
