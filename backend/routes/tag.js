const express = require("express");
const router = express.Router();
const { create, list, read, remove } = require("../controllers/tag");
const { requireLogin, adminMiddleware } = require("../controllers/auth");

// Bring in the validators
const { runValidation } = require("../validators");
const { tagCreateValidator } = require("../validators/tag");

router.post("/tag", 
            tagCreateValidator, 
            runValidation, 
            requireLogin, 
            adminMiddleware,
            create)
router.get("/tags", list)
router.get("/tag/:slug", read)
router.delete("/tag/:slug", requireLogin, adminMiddleware, remove)

module.exports = router;