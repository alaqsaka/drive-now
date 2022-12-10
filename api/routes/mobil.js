const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const { upload } = require("../middleware/multer");
// const multer = require("multer");
// const path = require("path");
// const storate = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./images");
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage: storate });
const mobilHandler = require("./handler/mobil");

// Register route
router.post("/", upload, mobilHandler.createMobil);
router.get("/", mobilHandler.getAllMobil);
router.get("/:id", mobilHandler.getMobil);
// router.put("/:id", mobilHandler.updateMobil);
// router.get("/:id", mobilHandler.getMobil);
// router.delete("/:id", mobilHandler.deleteMobil);

module.exports = router;
