const { Lokasi } = require("../../../models");
module.exports = async (req, res) => {
  const id = req.params.id;

  const lokasi = await Lokasi.destroy({
    where: {
      id: id,
    },
  });

  if (!lokasi) {
    return res.status(404).json({
      status: "error",
      message: `Lokasi denga ${id} tidak ditemukan`,
    });
  }

  return res.json({
    status: "success",
    message: `Data dengan id ${id} berhasil diapus`,
  });
};
