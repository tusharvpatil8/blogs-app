const express = require("express");
// const userController = require("../controllers/user/user.controller");
const router = express.Router();
// const { isAdminAuthentic } = require("../helpers/auth.helper");
// const schemas = require("../validation/validation.schemas");
// const { ValidateBody } = require("../validation/validation.methods");
const fileUploadController = require("../common/fileUpload.controller");
const upload = require("../middleware/multer.upload");
//---------------------- file upload ----------------------//

// router.post(
//   "/image",
//   // ValidateBody(schemas.uploadOne),
//   // isAdminAuthentic,
//   fileUploadController.uploadImage
// );

// router.post(
//   "/images",
//   // ValidateBody(schemas.uploadMany),
//   // isAdminAuthentic,
//   fileUploadController.uploadMultipleImage
// );

// router.delete(
//   "/image",
//   // ValidateBody(schemas.deleteImages),
//   // isAdminAuthentic,
//   fileUploadController.deleteImage
// );

// router.delete(
//   "/image",
//   // ValidateBody(schemas.deleteImages),
//   // isAdminAuthentic,
//   fileUploadController.deleteMultipleImage
// );

router.post(
  "/image",
  upload.single("image"),
  fileUploadController.uploadImage
);

module.exports = router;
