const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para verificar el token de autenticación
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado, token no proveído' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new Error();
    }
    req.userId = user._id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Acceso denegado, token inválido' });
  }
};

module.exports = authMiddleware;
