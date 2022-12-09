const { Lokasi } = require("../../../models");

module.exports = async (req, res) => {
  const sqlOptions = {
    attributes: ["id", "name", "description"],
  };

  const lokasi = await Lokasi.findAll(sqlOptions);
  return res.json({
    status: "success",
    data: lokasi,
  });
};
