const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const customersHandler = require("./handler/customers");

// Register route
router.post("/register", customersHandler.register);
// router.post("/login", customersHandler.login);
// router.get("/profile", protect, customersHandler.getUserProfile);
// router.put("/:id", customersHandler.update);
// router.get("/:id", customersHandler.getUser);
// router.get("/", customersHandler.getcustomers);
// router.post("/logout", customersHandler.logout);

module.exports = router;
