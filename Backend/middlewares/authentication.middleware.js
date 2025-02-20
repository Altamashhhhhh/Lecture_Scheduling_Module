const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access. Please log in to continue.",
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token. Please log in again.",
      });
    }

    req.user = decoded;
    console.log("Decoded Token Data:", decoded);

    next();
  });
};



module.exports = authentication;
