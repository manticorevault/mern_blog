const express = require("express");
const router = express.Router();
const { requireLogin, authMiddleware, adminMiddleware } = require("../controllers/auth");
const { read, publicProfile, update, photo } = require("../controllers/user");


router.get("/profile", requireLogin, authMiddleware, read);
router.get("/user/:username", publicProfile);
router.get("/user/photo/:username", photo);
router.put("/user/update", requireLogin, authMiddleware, update)

module.exports = router;