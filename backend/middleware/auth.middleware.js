// middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = '4dd815a63667e1f6a25b65b47cebdcbe';

module.exports = function (req, res, next) {
  // Get token from header
  const tokenHeader = req.header('Authorization');

  // Check if no token
  if (!tokenHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Check if token is in the correct format
  if (!tokenHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token is not valid' });
  }

  try {
    // Get token from header
    const token = tokenHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Add user from payload
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};