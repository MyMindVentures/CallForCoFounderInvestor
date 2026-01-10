import outreachService from '../services/OutreachService.js';
import { sanitizeError, logError } from '../utils/errorHandler.js';

class OutreachController {
  async createOutreach(req, res) {
    try {
      const outreach = await outreachService.createOutreach(req.body);
      res.status(201).json(outreach);
    } catch (error) {
      logError('OutreachController.createOutreach', error);
      if (error.message.includes('required') || error.message.includes('invalid')) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: sanitizeError(error) });
    }
  }

  async getAllOutreach(req, res) {
    try {
      const outreach = await outreachService.getAllOutreach();
      res.json(outreach);
    } catch (error) {
      logError('OutreachController.getAllOutreach', error);
      res.status(500).json({ error: sanitizeError(error) });
    }
  }

  async updateOutreach(req, res) {
    try {
      const outreach = await outreachService.updateOutreach(req.params.id, req.body);
      if (!outreach) {
        return res.status(404).json({ error: 'Outreach entry not found' });
      }
      res.json(outreach);
    } catch (error) {
      logError('OutreachController.updateOutreach', error);
      if (error.message.includes('invalid')) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: sanitizeError(error) });
    }
  }

  async deleteOutreach(req, res) {
    try {
      await outreachService.deleteOutreach(req.params.id);
      res.json({ success: true });
    } catch (error) {
      logError('OutreachController.deleteOutreach', error);
      res.status(500).json({ error: sanitizeError(error) });
    }
  }
}

export default new OutreachController();
