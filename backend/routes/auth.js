const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/auth");

// Validators
const { runValidation } = require("../validators");
const { userSignupValidator } = require("../validators/auth");
const { userLoginValidator } = require("../validators/auth");

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/login", userLoginValidator, runValidation, login);

module.exports = router;