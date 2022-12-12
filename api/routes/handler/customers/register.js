const bcrypt = require("bcrypt");
const { Customer } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    name: "string|empty:false",
    email: "email|empty:false",
    password: "string|min:6",
    dateOfBirth: "string|empty:false",
    phone: "string|empty:false",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const customer = await Customer.findOne({
    where: { email: req.body.email },
  });

  if (customer) {
    return res.status(409).json({
      status: "error",
      message: "Email address or Phone Number is already registered",
    });
  }

  const password = await bcrypt.hash(req.body.password, 10);

  const data = {
    password,
    name: req.body.name,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    phone: req.body.phone,
  };

  const createCustomer = await Customer.create(data);

  return res.status(200).json({
    status: "success",
    data: {
      id: createCustomer.id,
    },
  });
};
