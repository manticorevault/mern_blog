const express = require('express');
const router = express.Router();
const { create } = require('../controllers/blog');

const { requireLogin, adminMiddleware } = require('../controllers/auth');

router.post('/blog', requireLogin, adminMiddleware, create);

module.exports = router;