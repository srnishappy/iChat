import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({ msg: 'All fields are required' });
    }
    if (password.length < 4) {
      return res
        .status(400)
        .json({ msg: 'Password must be at least 4 characters long' });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullname: fullName,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      return res.status(201).json({
        msg: 'User created successfully',
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ msg: 'Something went wrong' });
    }
  } catch (err) {
    console.log('Error Signup', err);
    return res.status(500).json({ msg: 'Something went wrong' });
  }
};
export const login = (req, res) => {
  res.send('login');
};
export const logout = (req, res) => {
  res.send('logout');
};
