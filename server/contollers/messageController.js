const User=require('../models/User')
const Message=require('../models/Message')

const createMessage = async (req, res) => {
  try {
    console.log("body ", req.body);
    const { senderId, receiverId, content } = req.body;

    // Fetch the sender and receiver details from the User model
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    // Ensure both sender and receiver exist before proceeding
    if (!sender || !receiver) {
      return res.status(404).json({ message: "Sender or receiver not found" });
    }

    const newMessage = Message({
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
    res.status(500).json({ message: "server error" });
  }
};
module.exports={createMessage}