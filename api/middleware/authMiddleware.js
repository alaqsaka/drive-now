const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
// const { User } = require("../../../models");
const { User } = require("../models");

module.exports = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  console.log("Authheader ", authHeader);
  console.log(authHeader.startsWith("Bearer"));
  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      // extract token from authHeader string
      token = authHeader.split(" ")[1];
      console.log(token);
      // verified token returns user id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      // find user's obj in db and assign to req.user
      req.user = await await User.findByPk(decoded.id);

      next();
    } catch (error) {
      res.status(401);
      console.log(error);
      res.json({
        error: error.message,
      });
      //   throw new Error("Not authorized, invalid token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token found");
  }
});
