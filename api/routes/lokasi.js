const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const lokasiHandler = require("./handler/lokasi");

// Register route
router.post("/", lokasiHandler.createLokasi);
router.get("/", lokasiHandler.getAllLokasi);
router.put("/:id", lokasiHandler.updateLokasi);
router.get("/:id", lokasiHandler.getLokasi);

module.exports = router;
