import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

import { JWT_KEY } from '../../config.js';

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies['jwt-linkedin'];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, JWT_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select('-password');

    if(!user) {
      return res.status(401).json({ message: "User Not Found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error('Error in protectRoute middleware', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}