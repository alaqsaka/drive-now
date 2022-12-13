const { Mobil } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();
const isBase64 = require("is-base64");
const base64Img = require("base64-img");
// const image = require('../../../images')

module.exports = async (req, res) => {
  // console.log(object);
  // console.log(req);
  console.log("REQ FILE ", req.file);
  console.log(req.body);
  // console.log(req.file.name);

  // console.log("IMAGE URL", imageUrl);

  // const schema = {
  //   name: "string|empty:false",
  //   description: "string|empty:false",
  //   totalSeat: "string|empty:false",
  //   price: "string|empty:false",
  //   fuelType: "string|empty:false",
  //   image: "string|empty:false",
  // };

  // const validate = v.validate(req.body, schema);

  // if (validate.length) {
  //   return res.status(400).json({
  //     status: "error",
  //     message: validate,
  //   });
  // }

  if (!req.file) {
    return res.status(404).json({ message: "Image not found" });
  }

  const imageUrl = `images/${req.file.filename}`;

  const mobil = await Mobil.findOne({
    where: {
      name: req.body.name,
    },
  });

  if (mobil) {
    return res.status(409).json({
      status: "error",
      message: "Mobil dengan nama ini sudah terdaftar",
    });
  }

  const mobilSlug = req.body.name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  const createMobil = await Mobil.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    fuelType: req.body.fuelType,
    totalSeat: req.body.totalSeat,
    image: imageUrl,
    slug: mobilSlug,
  });

  // console.log("createmobil ", createMobil);

  return res.status(200).json({
    status: "success",
    message: "Mobil berhasil didaftarkan",
    data: {
      ...createMobil.dataValues,
    },
  });
};
