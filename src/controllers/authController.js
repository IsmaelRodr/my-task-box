const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Busca usuário pelo email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Email ou senha inválidos' });
      }

      // Compara a senha enviada com o hash do banco
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Email ou senha inválidos' });
      }

      // Cria token JWT (payload pode incluir id e email)
      const token = jwt.sign(
        { id: user._id, email: user.email },
        config.jwtSecret,
        { expiresIn: '1h' }
      );

      // Retorna o token e dados básicos do usuário
      res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = new AuthController();
