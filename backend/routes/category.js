const { Router } = require("express");
const express = require("express");
const router = express.Router();
const { create } = require("../controllers/category");

// Bring in the validators
const { runValidation } = require("../validators");
const { requireLogin, adminMiddleware } = require("../controllers/auth");
const { categoryCreateValidator } = require("../validators/category");

router.post("/category", 
            categoryCreateValidator, 
            runValidation, 
            requireLogin, 
            adminMiddleware,
            create
        )

module.exports = router;