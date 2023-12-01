const jwt = require("jsonwebtoken");

const verifyValidUser = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json("you need to log in");
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json("you are not verify");

    req.user = user;
    next();
  });
};

module.exports = verifyValidUser;
