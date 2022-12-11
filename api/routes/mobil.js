const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const { upload } = require("../middleware/multer");
const mobilHandler = require("./handler/mobil");

// Register route
router.post("/", upload, mobilHandler.createMobil);
router.get("/", mobilHandler.getAllMobil);
router.get("/:id", mobilHandler.getMobil);
// router.put("/:id", mobilHandler.updateMobil);
// router.get("/:id", mobilHandler.getMobil);
// router.delete("/:id", mobilHandler.deleteMobil);

module.exports = router;
