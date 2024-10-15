const { Router } = require("express");
const ComicController = require("../controllers/comic.controller");

const ComicRouter = Router();

ComicRouter.route("/").get(ComicController.getAll).post(ComicController.create);

ComicRouter.route("/:id")
  .get(ComicController.getById)
  .patch(ComicController.update)
  .delete(ComicController.delete);

module.exports = ComicRouter;
