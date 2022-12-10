const { Mobil } = require("../../../models");

module.exports = async (req, res) => {
  const sqlOptions = {
    attributes: [],
  };

  const mobil = await Mobil.findAll();
  return res.json({
    status: "success",
    data: mobil,
  });
};
