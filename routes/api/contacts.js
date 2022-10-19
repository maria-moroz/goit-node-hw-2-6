const express = require("express");

const { contacts: ctrl } = require("../../controllers");

const {
  authorization,
  validation,
  isValidId,
  ctrlWrapper,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");

const validationMiddleware = validation(schemas.addSchema);
const favValidationMiddleware = validation(schemas.updateFavouriteSchema);

const router = express.Router();

router.get("/", authorization, ctrlWrapper(ctrl.listAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", authorization, validationMiddleware, ctrlWrapper(ctrl.add));

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  isValidId,
  validationMiddleware,
  ctrlWrapper(ctrl.updateById)
);

router.put(
  "/:contactId/favorite",
  isValidId,
  favValidationMiddleware,
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
