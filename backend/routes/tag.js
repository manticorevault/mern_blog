const express = require("express");
const router = express.Router();

// Bring in the controllers
const { requireLogin, adminMiddleware } = require("../controllers/auth");
const { create, list, read, remove } = require("../controllers/tag");

// Bring in the validators
const { runValidation } = require("../validators");
const { createTagValidator } = require("../validators/tag");

router.post("/tag", createTagValidator, runValidation, requireLogin, adminMiddleware, create);
router.get("/tags", list);
router.get("/tag/:slug", read);
router.delete("/tag/:slug", requireLogin, adminMiddleware, remove);

module.exports = router;
