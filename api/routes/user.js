const express = require("express");
const { test, updateUser } = require("../controller/userController.js");
const verifyValidUser = require("../utills/verfifyUser.js");
// const { verifyValidUser } = require("../utills/verfifyUser.js");
const router = express.Router();
router.get("/", test);

router.post("/update/:id", verifyValidUser, updateUser);
module.exports = router;
