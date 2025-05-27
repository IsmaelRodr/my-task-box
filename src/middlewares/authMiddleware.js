const jwt = require('jsonwebtoken');
const config = require('../config/config');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
  return res.status(401).json({ error: 'Token não fornecido' });
  }


  const token = authHeader.startsWith('Bearer ')
  ? authHeader.slice(7) // remove 'Bearer ' (7 caracteres)
  : authHeader; // assume que já é só o token


  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = { id: decoded.id }; // Aqui você injeta o userId no request
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

module.exports = authMiddleware;
