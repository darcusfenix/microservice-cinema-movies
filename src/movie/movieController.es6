import log4js from "log4js";

import {getMovieModel} from "./movieModelFactory";
import {movieSchema} from "./movieValidationSchema";

const log = log4js.getLogger("MOVIE-CONTROLLER");

export const
    get = async(req, res) => {
        const Movie = await getMovieModel();

        let query = {};

        if (req.query.title) {

            query.title = req.query.title;

        }

        Movie.find(query, (err, pets) => {

            if (err) {

                res.status(500).send(err);

            } else {

                res.json(pets);

            }

        });

    },
    getById = (req, res) => {

        if (req.movie === null) {

            res.statusCode = 404;
            res.json({"message": "not found"});

        } else {

            res.json(req.movie);

        }

    },
    patch = (req, res) => {

        if (req.body._id) {

            delete req.body._id;

        }

        for (const property in req.body) {

            req.movie[property] = req.body[property];

        }

        const promise = req.movie.save();
        promise.then(movie => {

            res.json(movie);

        });

        promise.catch(error => {

            res.statusCode = 505;
            res.json({"message": error});

        });

    },
    post = async(req, res) => {

        const Movie = await getMovieModel();
        req.checkBody(movieSchema);

        const errors = req.validationErrors();

        if (errors) {
            log.error(errors);
            res.status(401).json(errors);
        }

        let pet = new Movie(req.body);

        pet.save();
        res.status(201);
        res.send(pet);

    },
    preRequestById = async(req, res, next) => {

        const Movie = await getMovieModel();
        const query = Movie.findById({"_id": req.params.id});
        query.exec().then(movie => {

            req.movie = movie;
            log.debug(movie);
            next();

        }).catch(error => {

            log.error(error);
            res.statusCode = 404;
            res.json({"message": error});

        });

    },
    put = (req, res) => {

        req.movie.title = req.body.title;
        req.movie.duration = req.body.duration;
        req.movie.description = req.body.description;
        req.movie.rate = req.body.rate;

        const promise = req.movie.save();

        promise.then(movie => {

            res.json(movie);

        });
        promise.catch(error => {

            res.statusCode = 505;
            res.json({"message": error});

        });

    },
    remove = (req, res) => {

        const promise = req.movie.remove();
        promise.then(() => {

            res.statusCode = 204;
            res.json({"message": "removed"});

        });
        promise.catch(error => {

            log.error(error);
            res.statusCode = 505;
            res.json({"message": error});

        });

    };
