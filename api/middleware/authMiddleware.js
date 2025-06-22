

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization; // Get the full header string
  console.log('Authorization Header:', authHeader); 
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded ID:", decoded.id);
const user = await User.findById(decoded.id);
console.log("User from DB:", user);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token failed' });
  }
};

module.exports = { protect };
