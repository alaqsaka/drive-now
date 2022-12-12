const bcrypt = require("bcrypt");
const { Customer } = require("../../../models");
const Validator = require("fastest-validator");
const generateToken = require("../../../utils/generateToken");
const cookie = require("cookie");
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    email: "email|empty:false",
    password: "string|min:6",
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  // mengecek apakah email ada di database
  const customer = await Customer.findOne({
    where: { email: req.body.email },
  });

  // jika email ga ada di database
  if (!customer) {
    return res.status(404).json({
      status: "error",
      message: "Account with this email not found",
    });
  }

  // jika email ada di db
  // cek apakah passwordnya valid
  const isValidPassword = await bcrypt.compare(
    req.body.password,
    customer.password
  );

  if (!isValidPassword) {
    return res.status(404).json({
      status: "error",
      message: "Incorrect password",
    });
  }

  let token = generateToken(customer.id);

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("ACCESS_TOKEN", token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60, // 8 hours
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  );

  // jika password benar
  res.status(200).json({
    status: "success",
    data: {
      id: customer.id,
      name: customer.name,
      email: customer.email,
    },
    customerToken: generateToken(customer.id),
  });
};
