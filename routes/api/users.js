const express = require("express");

const { users: ctrl } = require("../../controllers");

const {
  upload,
  validation,
  authorization,
  ctrlWrapper,
} = require("../../middlewares");
const { schemas } = require("../../models/user");

const signupValidation = validation(schemas.signupSchema);
const loginValidation = validation(schemas.loginSchema);

const router = express.Router();

router.post("/signup", signupValidation, ctrlWrapper(ctrl.signup));
router.post("/login", loginValidation, ctrlWrapper(ctrl.login));
router.get("/logout", authorization, ctrlWrapper(ctrl.logout));
router.get("/current", authorization, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/avatars",
  authorization,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
