const { Router } = require("express");
const ComicController = require("../controllers/comic.controller");
const ComicValidator = require("../validators/comic.validators");
const RouteValidator = require("../validators/routes.validator");

const ComicRouter = Router();

ComicRouter.route("/")
  .get(RouteValidator.validateComicsQuery, ComicController.getList)
  .post(ComicValidator.validateCreateComic, ComicController.create);

ComicRouter.route("/:id")
  .get(RouteValidator.validateObjectId, ComicController.getById)
  .patch(
    RouteValidator.validateObjectId,
    ComicValidator.validateUpdateComic,
    ComicController.update
  )
  .delete(RouteValidator.validateObjectId, ComicController.delete);

module.exports = ComicRouter;
