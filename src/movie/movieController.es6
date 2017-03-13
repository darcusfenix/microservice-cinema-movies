const movieController = (Movie) => {

    const get = (req, res) => {

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
        post = (req, res) => {

            let pet = new Movie(req.body);


            if (!req.body.title) {

                res.status(400);
                res.send("Name is required");

            } else {

                pet.save();
                res.status(201);
                res.send(pet);

            }


        };

    return {
        "get": get,
        "post": post
    };

};

export default movieController;
