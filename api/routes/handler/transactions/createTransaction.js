const { Transaction } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  if (!req.file) {
    return res.status(404).json({ message: "Image not found" });
  }

  const imageUrl = `images/${req.file.filename}`;
  console.log(imageUrl);

  // const schema = {
  //   name: "string|empty:false",
  //   email: "string|empty:false",
  //   phone: "string|empty:false",
  //   gender: "string|empty:false",
  //   identificationNumber: "string|empty:false",
  //   lokasiId: "string|empty:false",
  //   mobilId: "string|empty:false",
  //   startDate: "string|empty:false",
  //   endDate: "string|empty:false",
  //   totalPayment: "string|empty:false",
  //   customerId: "string|empty:false",
  // };

  // const validate = v.validate(req.body, schema);

  // if (validate.length) {
  //   return res.status(400).json({
  //     status: "error",
  //     message: validate,
  //   });
  // }

  const createTransaction = await Transaction.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
    identificationNumber: req.body.identificationNumber,
    lokasiId: req.body.lokasiId,
    mobilId: req.body.mobilId,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    totalPayment: req.body.totalPayment,
    image: imageUrl,
    customerId: req.body.customerId,
  });

  return res.status(200).json({
    status: "success",
    message: "Mobil berhasil didaftarkan",
    data: {
      id: createTransaction.id,
    },
  });
};
