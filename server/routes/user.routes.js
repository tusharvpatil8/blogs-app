const express = require("express");
const router = express.Router();

const blogController = require("../controller/admin/blog.controller");

router.post("/all-blogs", blogController.getAllBlogs);
// router.get("/blog/:id", blogController.getOneBlog);
// router.post("/blog-by-slug/:slug", blogController.getBlogBySlug);
// router.post("/blog/:id", blogController.getAllRelatedBlog);
// router.get("/blog-by-type", blogController.getBlogsByFilter);

module.exports = router;
