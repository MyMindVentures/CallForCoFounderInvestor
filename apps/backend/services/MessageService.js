import messageRepository from '../repositories/MessageRepository.js';
import donationRepository from '../repositories/DonationRepository.js';
import { sendThankYouEmail } from '../utils/email.js';

class MessageService {
  async createMessage(data) {
    // Validate input
    if (!data.name || !data.email || !data.message) {
      throw new Error('Name, email, and message are required');
    }

    // Create message
    const message = await messageRepository.create({
      name: data.name,
      email: data.email,
      message: data.message,
      donationAmount: data.donationAmount || null
    });

    // Send thank you email
    try {
      await sendThankYouEmail(data.email, data.name);
    } catch (error) {
      console.error('Failed to send thank you email:', error);
      // Don't fail the request if email fails
    }

    return message;
  }

  async getAllMessages() {
    return await messageRepository.findAll();
  }

  async getPublicMessages() {
    return await messageRepository.findPublic();
  }

  async curateMessage(id, curationData) {
    const message = await messageRepository.findById(id);
    if (!message) {
      throw new Error('Message not found');
    }

    return await messageRepository.update(id, {
      isPositive: curationData.isPositive,
      isPublished: curationData.isPublished
    });
  }

}

export default new MessageService();
