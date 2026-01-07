import donationRepository from '../repositories/DonationRepository.js';
import messageRepository from '../repositories/MessageRepository.js';

class DonationService {
  async createDonation(data) {
    // Validate input
    if (!data.amount || !data.donorEmail || !data.donorName) {
      throw new Error('Amount, donor email, and donor name are required');
    }

    // Create donation
    const donation = await donationRepository.create({
      amount: data.amount,
      currency: data.currency || 'EUR',
      donorEmail: data.donorEmail,
      donorName: data.donorName,
      wiseTransactionId: data.wiseTransactionId || null,
      messageId: data.messageId || null
    });

    // Link donation to message if messageId provided
    if (data.messageId) {
      await messageRepository.update(data.messageId, {
        donationAmount: data.amount,
        donationId: donation.id
      });
    }

    return donation;
  }

  async getAllDonations() {
    return await donationRepository.findAll();
  }

  async getDonationStats() {
    return await donationRepository.getStats();
  }
}

export default new DonationService();
