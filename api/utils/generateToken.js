const jwt = require("jsonwebtoken");

// generate token that expires in 12 hours
module.exports = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "12h" });
};
