import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import cloudinary from '../lib/cloudinary.js';

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
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    generateToken(user._id, res);
    return res.status(200).json({
      msg: 'Login successful',
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (err) {
    console.log('Error Login', err);
    res.status(500).json({ msg: 'Something went wrong' });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    return res.status(200).json({ msg: 'Logout successful' });
  } catch (err) {
    console.log('Error Logout', err);
    res.status(500).json({ msg: 'Something went wrong' });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: 'Profile pic is required' });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log('error in update profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Something went wrong' });
  }
};
export const ChangeUserName = async (req, res) => {
  try {
    const { fullName } = req.body;
    if (!fullName || fullName.trim() === '') {
      return res.status(400).json({ message: 'Full name is required' });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.fullname = fullName.trim();
    await user.save();

    res
      .status(200)
      .json({
        message: 'Username updated successfully',
        fullname: user.fullname,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
