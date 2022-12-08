const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const lokasiHandler = require("./handler/lokasi");

// Register route
router.post("/", lokasiHandler.createLokasi);
router.get("/", lokasiHandler.getAllLokasi);

module.exports = router;
