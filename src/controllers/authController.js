// src/controllers/authController.js
const authService = require('../services/authService');

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const { token, user } = await authService.login(email, password);

      res.json({ token, user });
    } catch (error) {
      console.error('Erro no login:', error.message);
      res.status(401).json({ error: error.message || 'Erro interno do servidor' });
    }
  }
}

module.exports = new AuthController();
