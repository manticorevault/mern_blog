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
    listSearch,
    listByUser
} = require('../controllers/blog');

const { requireLogin, adminMiddleware, authMiddleware, canManageBlogs } = require('../controllers/auth');

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
router.get("/:username/blogs", listByUser);
router.delete("/user/blog/:slug", requireLogin, authMiddleware, canManageBlogs, remove)
router.put("/user/blog/:slug", requireLogin, authMiddleware, canManageBlogs, update);


module.exports = router;