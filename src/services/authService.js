// authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../../config/config');

class AuthService {
  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Usuário não encontrado');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Senha incorreta');

    const token = jwt.sign({ id: user._id, email: user.email }, config.jwtSecret, {
      expiresIn: '1h'
    });

    return { user, token };
  }
}

module.exports = new AuthService();
