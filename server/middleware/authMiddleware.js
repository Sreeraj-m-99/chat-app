const jwt = require("jsonwebtoken");

const secretKey = "secretKey123";

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token || !token.startsWith("Bearer ")) {
    console.log("Invalid token format");
    return res.status(401).json({ message: "Invalid token format" });
  }

  const tokenWithoutBearer = token.split(" ")[1];

  jwt.verify(tokenWithoutBearer, secretKey, (err, decodedToken) => {
    if (err) {
      console.error("Token verification error:", err.message);
      return res.status(401).json({ message: "Invalid token" });
    }

    console.log("Token without Bearer:", tokenWithoutBearer);
    console.log("Decoded Token:", decodedToken);

    req.userId = decodedToken.userId;
    next();
  });
};

module.exports = verifyToken;
