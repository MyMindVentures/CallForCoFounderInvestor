import donationService from '../services/DonationService.js';
import { sanitizeError, logError } from '../utils/errorHandler.js';

class DonationController {
  async createDonation(req, res) {
    try {
      const donation = await donationService.createDonation(req.body);
      res.status(201).json({ 
        message: 'Donation recorded successfully',
        donation 
      });
    } catch (error) {
      logError('DonationController.createDonation', error);
      if (error.message.includes('required')) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: sanitizeError(error) });
    }
  }

  async getAllDonations(req, res) {
    try {
      const donations = await donationService.getAllDonations();
      const stats = await donationService.getDonationStats();
      res.json({
        donations,
        stats: {
          total: stats.total,
          count: stats.count,
          average: stats.average
        }
      });
    } catch (error) {
      logError('DonationController.getAllDonations', error);
      res.status(500).json({ error: sanitizeError(error) });
    }
  }
}

export default new DonationController();
