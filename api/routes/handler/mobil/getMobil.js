const { Mobil } = require("../../../models");

module.exports = async (req, res) => {
  const slug = req.params.id;

  const mobil = await Mobil.findOne({ where: { slug: slug } });

  if (!mobil) {
    return res.status(404).json({
      status: "error",
      message: `Mobil dengan nama ${slug} tidak ditemukan`,
    });
  }

  return res.json({
    status: "success",
    data: mobil,
  });
};
