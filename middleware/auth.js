const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get Token from header

  const token = req.header('x-auth-token');

  if (!token)
    return res.status(401).json({ msg: 'No token, authorization denied' });

  // Verify Token
  try {
    const decoded = jwt.decode(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
