import cloudinary from '../lib/cloudinary.js';
import Message from '../models/message.model.js';
import User from '../models/user.model.js';

export const getUserSidebar = async (req, res) => {
  try {
    const loginUserId = req.user._id;
    const fillterUsers = await User.find({ id: { $ne: loginUserId } }).select(
      '-password'
    );
    res.status(200).json(fillterUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};
export const getMessage = async (req, res) => {
  try {
    const { id: UserChatId } = req.params;
    const senderId = req.user._id;
    const message = await Message.find({
      $or: [
        { senderId: senderId, receiverId: UserChatId },
        { senderId: UserChatId, receiverId: senderId },
      ],
    });
    res.status(200).json(message);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let imageUrl;
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image);
      imageUrl = uploadRes.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};
