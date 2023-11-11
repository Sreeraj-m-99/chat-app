// // server/sockets/chatSocket.js
// const { io } = require('../app');
// const Message = require('../models/Message');

// io.on('connection', (socket) => {
//   console.log('a user connected');

//   // Listen for new messages
//   socket.on('newMessage', async (message) => {
//     try {
//       // Save the message to the database
//       const newMessage = new Message(message);
//       await newMessage.save();

//       // Emit the message to the relevant users
//       io.emit('newMessage', newMessage);
//     } catch (error) {
//       console.error(error);
//     }
//   });

//   // Additional socket events for group chat, etc.

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

// module.exports = io;
