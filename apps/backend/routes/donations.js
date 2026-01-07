import express from 'express';
import donationController from '../controllers/DonationController.js';
import { authenticateToken } from '../middleware/auth.js';
import { checkDatabase } from '../middleware/dbCheck.js';

const router = express.Router();

// Record a donation
router.post('/', checkDatabase, (req, res) => donationController.createDonation(req, res));

// Get donation stats (admin only)
router.get('/', authenticateToken, checkDatabase, (req, res) => donationController.getAllDonations(req, res));

export default router;
