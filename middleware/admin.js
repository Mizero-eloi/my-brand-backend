const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  // Checking if the user is admin
  if (!req.user.isAdmin) {
    return res.status(403).send("Permission denied. You should be an admin !");
  } else {
    next();
  }
};
