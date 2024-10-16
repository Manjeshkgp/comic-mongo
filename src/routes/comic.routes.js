const { Router } = require("express");
const ComicController = require("../controllers/comic.controller");
const ComicValidator = require("../validators/comic.validators");
const { validateObjectId } = require("../validators/routes.validator");

const ComicRouter = Router();

ComicRouter.route("/")
  .get(ComicController.getAll)
  .post(ComicValidator.validateCreateComic, ComicController.create);

ComicRouter.route("/:id")
  .get(validateObjectId, ComicController.getById)
  .patch(
    validateObjectId,
    ComicValidator.validateUpdateComic,
    ComicController.update
  )
  .delete(validateObjectId, ComicController.delete);

module.exports = ComicRouter;
