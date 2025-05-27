// src/services/authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

class AuthService {
  async login(email, password) {
    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new Error('Email ou senha inválidos');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Email ou senha inválidos');

    const token = jwt.sign(
      { id: user._id, email: user.email },
      config.jwtSecret,
      { expiresIn: '1h' }
    );

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    };
  }
}

module.exports = new AuthService();
