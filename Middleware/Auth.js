import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../Models/UserModels.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '60d',
  });
};
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authozied, token not found');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authozied, not token');
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as a admin');
  }
});

const isBoss = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === 'boss') {
    next();
  } else {
    res.status(401);

    throw new Error('Not authorized as a admin');

    throw new Error('Not authorized as a boss');
  }
});
export { generateToken, protect, isAdmin, isBoss };
