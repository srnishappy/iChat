import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(400).json({ msg: 'No Token' });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(400).json({ msg: 'Invalid Token' });
    }
    const user = await User.findById(decode.userId).select('-password');
    if (!user) {
      return res.status(400).json({ msg: 'User Not Found' });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: 'Server Error' });
  }
};
