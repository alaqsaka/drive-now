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

  const lokasi = await Lokasi.findOne({
    where: { name: req.body.name },
  });

  if (lokasi) {
    return res.status(409).json({
      status: "error",
      message: "Lokasi sudah terdaftar",
    });
  }

  const createLokasi = await Lokasi.create({
    name: req.body.name,
    description: req.body.description,
    personInChargeName: req.body.personInChargeName,
    personInChargePhone: req.body.personInChargePhone,
  });
  console.log(createLokasi);

  return res.status(200).json({
    status: "success",
    data: {
      id: createLokasi.id,
    },
  });
};
