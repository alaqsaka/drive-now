const { Lokasi } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    name: "string|empty:false",
    description: "string|empty:false",
    personInChargeName: "string|empty:false",
    personInChargePhone: "string|empty:false",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const id = req.params.id;
  console.log(id);
  const lokasi = await Lokasi.findByPk(id);
  console.log(lokasi);
  if (!lokasi) {
    return res.status(409).json({
      status: "error",
      message: "Lokasi tidak terdaftar",
    });
  }

  // kalau lokasi udah ada

  const { description, personInChargeName, personInChargePhone } = req.body;

  const name = req.body.name;

  if (name) {
    // mengecek apakah name duplicate?
    const checkName = await Lokasi.findOne({
      where: {
        name,
      },
    });

    if (checkName && name !== lokasi.name) {
      return res.status(409).json({
        status: "error",
        message: "Name already exist",
      });
    }
  }

  await lokasi.update({
    name,
    description,
    personInChargeName,
    personInChargePhone,
  });

  return res.status(200).json({
    status: "success",
    data: {
      id: lokasi.id,
      name,
      description,
      personInChargeName,
      personInChargePhone,
    },
  });
};
