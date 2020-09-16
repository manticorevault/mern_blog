const express = require("express");
const router = express.Router();
const { create, list, read, remove } = require("../controllers/category");
const { requireLogin, adminMiddleware } = require("../controllers/auth");

// Bring in the validators
const { runValidation } = require("../validators");
const { categoryCreateValidator } = require("../validators/category");

router.post("/category", 
            categoryCreateValidator, 
            runValidation, 
            requireLogin, 
            adminMiddleware,
            create)
router.get("/categories", list)
router.get("/category/:slug", read)
router.delete("/category/:slug", requireLogin, adminMiddleware, remove)

module.exports = router;