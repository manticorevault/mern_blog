const express = require("express");
const router = express.Router();
const { register, login, logout, requireLogin, googleLogin } = require("../controllers/auth");

// Validators
const { runValidation } = require("../validators");
const { userRegisterValidator, userLoginValidator } = require("../validators/auth");

router.post("/register", userRegisterValidator, runValidation, register);
router.post("/login", userLoginValidator, runValidation, login);
router.get("/logout", logout);

// Google Login
router.post("google-login", googleLogin);

// Route Guard

module.exports = router;