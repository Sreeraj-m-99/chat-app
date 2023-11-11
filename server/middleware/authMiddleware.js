const jwt = require("jsonwebtoken");

const secretKey = "secretKey123";

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ message: "no token" });
  }

  jwt.compare(token, secretKey, (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: "invalid Token" });
    }
    req.userId = decodedToken.userId;
    next();
  });
};

module.exports = verifyToken;
