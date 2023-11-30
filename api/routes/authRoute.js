const express = require("express");
const authController = require("../controller/authController");
const router = express.Router();

router.post("/signup", authController.authController);
router.post("/login", authController.loginAuth);
router.post("/google", authController.googleLogIn);

module.exports = router;
