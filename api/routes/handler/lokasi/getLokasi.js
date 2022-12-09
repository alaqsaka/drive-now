const { Lokasi } = require("../../../models");

module.exports = async (req, res) => {
  const id = req.params.id;

  const lokasi = await Lokasi.findByPk(id, {
    attributes: [
      "id",
      "name",
      "description",
      "personInChargeName",
      "personInChargePhone",
    ],
  });

  if (!lokasi) {
    return res.status(404).json({
      status: "error",
      message: `Lokasi dengan id ${id} tidak ditemukan`,
    });
  }

  return res.json({
    status: "success",
    data: lokasi,
  });
};
