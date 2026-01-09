import messageService from '../services/MessageService.js';
import { sanitizeError, logError } from '../utils/errorHandler.js';

class MessageController {
  async createMessage(req, res) {
    try {
      const message = await messageService.createMessage(req.body);
      res.status(201).json({ 
        message: 'Message submitted successfully',
        id: message.id 
      });
    } catch (error) {
      logError('MessageController.createMessage', error);
      if (error.message.includes('required')) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: sanitizeError(error) });
    }
  }

  async getAllMessages(req, res) {
    try {
      const messages = await messageService.getAllMessages();
      res.json(messages);
    } catch (error) {
      logError('MessageController.getAllMessages', error);
      res.status(500).json({ error: sanitizeError(error) });
    }
  }

  async getPublicMessages(req, res) {
    try {
      const messages = await messageService.getPublicMessages();
      res.json(messages);
    } catch (error) {
      logError('MessageController.getPublicMessages', error);
      res.status(500).json({ error: sanitizeError(error) });
    }
  }

  async curateMessage(req, res) {
    try {
      const message = await messageService.curateMessage(req.params.id, req.body);
      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }
      res.json(message);
    } catch (error) {
      logError('MessageController.curateMessage', error);
      if (error.message === 'Message not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: sanitizeError(error) });
    }
  }
}

export default new MessageController();
