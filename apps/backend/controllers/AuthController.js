import authService from '../services/AuthService.js';
import { sanitizeError, logError } from '../utils/errorHandler.js';

class AuthController {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const result = await authService.login(username, password);
      res.json(result);
    } catch (error) {
      logError('AuthController.login', error);
      if (error.message === 'Invalid credentials') {
        return res.status(401).json({ error: error.message });
      }
      res.status(500).json({ error: sanitizeError(error) });
    }
  }

  async initializeAdmin(req, res) {
    try {
      const result = await authService.initializeAdmin();
      res.json(result);
    } catch (error) {
      logError('AuthController.initializeAdmin', error);
      res.status(500).json({ error: sanitizeError(error) });
    }
  }
}

export default new AuthController();
