const register = require("./register");
const login = require("./login");
const getCustomerProfile = require("./getCustomerProfile");
const deleteCustomer = require("./delete");
const getCustomer = require("./getCustomer");
const getAllCustomer = require("./getAllCustomer");

module.exports = {
  register,
  login,
  getCustomerProfile,
  deleteCustomer,
  getCustomer,
  getAllCustomer,
};
