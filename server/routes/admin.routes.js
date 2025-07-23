const express = require("express");
const router = express.Router();
const { ValidateBody } = require("../validation/validation.methods");
const validationSchema = require("../validation/validation.schemas");

const adminAuthController = require("../controller/admin/adminAuth.controller");
const blogController = require("../controller/admin/blog.controller");
const categoryController = require("../controller/admin/category.controller");
const { isAdminAuthentic } = require("../helpers/auth.helper");

// -------------------------- Admin Side Authentication -------------------------- //

router.get("/check-admin", adminAuthController.findAdmin);

router.post(
  "/sign-up",
  // ValidateBody(validationSchema.adminSchema),
  adminAuthController.createAdmin
);

router.post(
  "/login",
  // validateBody(validationSchema.signInadminSchemas),
  adminAuthController.login
);

router.post(
  "/forgot-password",
  // ValidateBody(schemas.forgotPasswordSchema),
  adminAuthController.forgotPassword
);

router.get(
  "/reset-password/:token",
  // ValidateBody(schemas.resetForgotPasswordSchema),
  adminAuthController.resetForgottenPassword
);

//------------------------------ Blogs -------------------------//

router.post(
  "/blog-list",
  isAdminAuthentic,
  blogController.getAllBlogs
);
router.post(
  "/add-blog",
  isAdminAuthentic,
  // ValidateBody(schemas.blogSchema),
  blogController.addBlog
);
router.put(
  "/blog/edit/:id",
  isAdminAuthentic,
  blogController.editBlog
);
router.delete(
  "/blog/delete/:id",
  isAdminAuthentic,
  blogController.deleteBlog
);
router.get("/blog/:id", blogController.getOneBlog);
// router.get("/blog/:id", blogController.getOneBlog);
router.patch(
  "/blog/status/:id",
  isAdminAuthentic,
  blogController.updateBlogPublishedStatus
);

//----------------- --------------- Configurations -------------------------------//


//----------------- Blogs category ------------------//

router.post(
  "/category",
  // ValidateBody(schemas.categorySchema),
  isAdminAuthentic,
  categoryController.add
);

router.put(
  "/category/:id",
  // ValidateBody(schemas.categorySchema),
  isAdminAuthentic,
  categoryController.edit
);

router.get(
  "/categories/:status",
  isAdminAuthentic,
  categoryController.getAll
);

router.get(
  "/category/:id",
  isAdminAuthentic,
  categoryController.getOne
);

router.put(
  "/category/inactivate/:id",
  isAdminAuthentic,
  categoryController.inactivate
);

router.delete(
  "/category/:id",
  isAdminAuthentic,
  categoryController.delete
);


//----------------- Writers ------------------//


module.exports = router;
