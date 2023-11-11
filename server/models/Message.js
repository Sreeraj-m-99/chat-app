
const mongoose=require('mongoose')

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: String,
  senderName:  String,
  senderEmail:String,
  receiverName: String,
  receiverEmail:String,
  timeStamp: { type: Date, default: Date.now }
});
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;


