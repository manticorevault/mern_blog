const express = require("express");
const router = express.Router();
const { signup, login, logout } = require("../controllers/auth");

// Validators
const { runValidation } = require("../validators");
const { userSignupValidator, userLoginValidator } = require("../validators/auth");

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/login", userLoginValidator, runValidation, login);
router.get("/logout", userLoginValidator, runValidation, logout);

module.exports = router;