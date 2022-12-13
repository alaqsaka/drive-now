const express = require("express");
const transactionsHandler = require("./handler/transactions");
const { upload } = require("../middleware/multer");
const router = express.Router();

router.post("/", upload, transactionsHandler.createTransaction);
module.exports = router;
