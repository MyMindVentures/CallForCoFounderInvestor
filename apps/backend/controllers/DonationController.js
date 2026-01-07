import donationService from '../services/DonationService.js';

class DonationController {
  async createDonation(req, res) {
    try {
      const donation = await donationService.createDonation(req.body);
      res.status(201).json({ 
        message: 'Donation recorded successfully',
        donation 
      });
    } catch (error) {
      if (error.message.includes('required')) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
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
      res.status(500).json({ error: error.message });
    }
  }
}

export default new DonationController();
