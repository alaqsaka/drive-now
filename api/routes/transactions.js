const express = require("express");
const transactionsHandler = require("./handler/transactions");
const { upload } = require("../middleware/multer");
const router = express.Router();

router.post("/", transactionsHandler.createTransaction);
module.exports = router;
