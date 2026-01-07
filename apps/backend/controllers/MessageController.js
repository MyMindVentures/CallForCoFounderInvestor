import messageService from '../services/MessageService.js';

class MessageController {
  async createMessage(req, res) {
    try {
      const message = await messageService.createMessage(req.body);
      res.status(201).json({ 
        message: 'Message submitted successfully',
        id: message.id 
      });
    } catch (error) {
      if (error.message.includes('required')) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async getAllMessages(req, res) {
    try {
      const messages = await messageService.getAllMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPublicMessages(req, res) {
    try {
      const messages = await messageService.getPublicMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
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
      if (error.message === 'Message not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }
}

export default new MessageController();
