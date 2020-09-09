const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/auth");

// Validators
const { runValidation } = require("../validators");
const { userRegisterValidator, userLoginValidator } = require("../validators/auth");

router.post("/register", userRegisterValidator, runValidation, register);
router.post("/login", userLoginValidator, runValidation, login);
router.get("/logout", userLoginValidator, runValidation, logout);

module.exports = router;