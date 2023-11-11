const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "secretKey123";

const transporter = require("../config/nodeMailerConfig");

const register = async (req, res) => {
  try {
    console.log(req.body, "request");
    const { username, password, email } = req.body;

    const existingUser = await User.findOne({ email });
    console.log("existing user", existingUser);

    if (existingUser) {
      return res.status(400).json({ message: "user already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword, email });
    console.log("new user", newUser);

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, userEmail: newUser.email },
      secretKey,
      { expiresIn: "1h" }
    );

    console.log("token", token);

    res.status(201).json({
      user: {
        userId: newUser._id,
        userEmail: newUser.email,
        userName: newUser.username,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};

const login = async (req, res) => {
  try {
    console.log("body is", req.body);
    const { email, password } = req.body;

    const checkUserExist = await User.findOne({ email });

    if (!checkUserExist) {
      return res.status(401).json({ message: "invalid creditional" });
    }

    const isPasswordMatching = await bcrypt.compare(
      password,
      checkUserExist.password
    );

    if (!isPasswordMatching) {
      return res.status(401).json({ message: "invalid creditional" });
    }

    const token = jwt.sign(
      { userId: checkUserExist._id, userEmail: checkUserExist.email },
      secretKey,
      { expiresIn: "1h" }
    );
    return res.status(201).json({
      user: { userId: checkUserExist._id, userEmail: checkUserExist.email },
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("email", email);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "invalid user email" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log("token is", otp);
    user.resetPasswordToken = otp;
    user.resetPasswordExpires = Date.now() + 3600000;

    try {
      await user.save();

      const mailOptions = {
        from: "sreerajmadivayal@gmail.com",
        to: email,
        subject: "Password Reset",
        text: `Your OTP to reset the password is: ${otp}`,
      };

      await transporter.sendMail(mailOptions);

      res
        .status(200)
        .json({ message: "Password reset OTP sent to your email" });
    } catch (saveError) {
      console.error("User save error:", saveError);
      res.status(500).json({ message: "Failed to save user data" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { resetPasswordToken, email } = req.body;

    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res.status(401).json({ message: "invalid user" });
    }

    if (
      findUser.resetPasswordToken !== resetPasswordToken ||
      findUser.resetPasswordExpires < Date.now()
    ) {
      return res.status(400).json({ message: "invalid or token expires" });
    }
    return res.status(200).json({ message: "otp validation successful" });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword, otp } = req.body;
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ message: "invalid user" });
    }
    if (
      findUser.resetPasswordToken !== otp ||
      findUser.resetPasswordExpires < Date.now()
    ) {
      return res.status(400).json({ message: "token expires" });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "password does not match" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    findUser.password = hashedPassword;

    findUser.resetPasswordExpires = undefined;
    findUser.resetPasswordToken = undefined;

    await findUser.save();

    return res.status(200).json({ message: "password updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

module.exports = { register, login, forgotPassword, verifyOtp, changePassword };
