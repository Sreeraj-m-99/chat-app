const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/chat-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connected successfully");
  })
  .catch(() => {
    console.log("mongodb connection error");
  });

const messageRoutes = require("./routes/messages");
const authRoutes = require("./routes/auth");

// Corrected routes
app.use("/api/messages", messageRoutes);
app.use("/auth", authRoutes);


PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
module.exports = { express: app};
