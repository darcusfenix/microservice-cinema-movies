import {Router} from "express";
import mongoose from "mongoose";
import log4js from "log4js";

import Movie from "./movieModel";
import movieController from "./movieController";

const log = log4js.getLogger("ROUTE-MOVIE"),
    routes = () => {

        const petRouter = Router();

        let controller = movieController(Movie);

        petRouter.route("/")
            .post(controller.post)
            .get(controller.get);

        petRouter.use("/:id", (req, res, next) => {

            const query = Movie.findById({"_id": req.params.id});

            mongoose.Promise = global.Promise;
            query.exec().then(pet => {

                req.pet = pet;
                log.debug("MOVIE FOUND");
                log.debug(pet);
                next();

            }).catch(error => {

                log.error(error);
                res.statusCode = 404;
                res.json({"message": error});


            });

        });

        petRouter.route("/:id")
            .get((req, res) => {

                if (req.pet === null) {

                    res.statusCode = 404;
                    res.json({"message": "not found"});

                } else {

                    res.json(req.pet);

                }

            })
            .put((req, res) => {

                req.pet.title = req.body.title;
                req.pet.duration = req.body.duration;
                req.pet.description = req.body.description;
                req.pet.rate = req.body.rate;

                const promise = req.pet.save();

                promise.then(pet => {

                    res.json(pet);

                });

                promise.catch(error => {

                    res.statusCode = 505;
                    res.json({"message": error});

                });

            })
            .patch((req, res) => {

                if (req.body._id) {

                    delete req.body._id;

                }

                for (const property in req.body) {

                    req.pet[property] = req.body[property];

                }

                const promise = req.pet.save();


                promise.then(pet => {

                    res.json(pet);

                });

                promise.catch(error => {

                    res.statusCode = 505;
                    res.json({"message": error});

                });

            })
            .delete((req, res) => {

                const promise = req.pet.remove();


                promise.then(() => {

                    res.statusCode = 204;
                    res.json({"message": "removed"});

                });

                promise.catch(error => {

                    log.error(error);
                    res.statusCode = 505;
                    res.json({"message": error});

                });

            });

        return petRouter;

    };

export default routes();
