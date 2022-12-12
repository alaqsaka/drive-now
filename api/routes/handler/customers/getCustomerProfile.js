const asyncHandler = require("express-async-handler");
const { Customer } = require("../../../models");

module.exports = async (req, res) => {
  // req.user was set in authMiddleware.js

  const customer = await Customer.findByPk(req.user.id, {
    attributes: ["id", "name", "email", "dateOfBirth"],
  });

  if (customer) {
    res.json({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      dateOfBirth: customer.dateOfBirth,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};
