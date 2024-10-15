const {Router} = require("express");
const ComicRouter = require("./comic.routes");

const RootRouter = Router();

RootRouter.use("/comic",ComicRouter)

module.exports = RootRouter;