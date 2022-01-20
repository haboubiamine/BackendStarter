const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.userData.role == "Admin") {
    res.status(400).json("Permission denied!");
  } else {
    next();
  }
};
