const User = require('../models/User');
const Message = require('../models/Message');

const createMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = req.userId; // Use the authenticated user's ID

    // Fetch the sender and receiver details from the User model
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    // Ensure both sender and receiver exist before proceeding
    if (!sender || !receiver) {
      return res.status(404).json({ message: "Sender or receiver not found" });
    }

    // Check if the logged-in user matches the senderId
    if (senderId !== sender._id.toString()) {
      return res.status(403).json({ message: 'Forbidden: You are not allowed to send messages on behalf of another user' });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      content,
      senderName: sender.username,
      senderEmail: sender.email,
      receiverName: receiver.username,
      receiverEmail: receiver.email
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createMessage };
