import express from 'express';
import authController from '../controllers/AuthController.js';

const router = express.Router();

// Initialize admin user if it doesn't exist
router.post('/init', (req, res) => authController.initializeAdmin(req, res));

// Login
router.post('/login', (req, res) => authController.login(req, res));

export default router;
