import {Router} from "express";
import log4js from "log4js";

import {patch, getById, put, post, get, preRequestById, remove} from "./movieController";

const log = log4js.getLogger("ROUTE-MOVIE");
const movieRouter = Router();

movieRouter.route("/movies/")
    .post(post)
    .get(get);

movieRouter.use("/movies/:id", preRequestById);

movieRouter.route("/movies/:id")
    .get(getById)
    .put(put)
    .patch(patch)
    .delete(remove);

export default movieRouter;
