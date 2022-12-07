const asyncHandler = require("express-async-handler");
const { User } = require("../../../models");

module.exports = async (req, res) => {
  // req.user was set in authMiddleware.js

  const user = await User.findByPk(req.user.id, {
    attributes: ["id", "name", "email", "role", "profession", "avatar"],
  });

  if (user) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};
