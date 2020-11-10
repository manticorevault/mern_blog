const express = require('express');
const router = express.Router();
const {
    create,
    list,
    listPostsCategoriesTags,
    read,
    remove,
    update,
    photo,
    listRelated,
    listSearch
} = require('../controllers/blog');

const { requireLogin, adminMiddleware, authMiddleware } = require('../controllers/auth');

router.post('/blog', requireLogin, adminMiddleware, create);
router.post("/blogs-categories-tags", listPostsCategoriesTags);
router.post("/blogs/related", listRelated)

router.get("/blogs", list);
router.get("/blog/:slug", read);
router.get("/blog/photo/:slug", photo)
router.get("/blogs/search", listSearch)

router.delete("/blog/:slug", requireLogin, adminMiddleware, remove)
router.put("/blog/:slug", requireLogin, adminMiddleware, update);

// User authorization for CRUDing blogs
router.post('/user/blog', requireLogin, authMiddleware, create);
router.delete("/user/blog/:slug", requireLogin, authMiddleware, remove)
router.put("/user/blog/:slug", requireLogin, authMiddleware, update);

module.exports = router;