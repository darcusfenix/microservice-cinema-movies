import {settings, ConnectionProvider}   from "microservice-cinema-core";
import session  from "express-session";
import mongoStoreFactory  from "connect-mongo";
import log4js from "log4js";

const log = log4js.getLogger("SESSION-MANAGEMENT-MONGO");

const MongoStore = mongoStoreFactory(session);


const sessionManagementConfig = async(app) => {

    try {

        const conn = await ConnectionProvider()
            .then( () => {

                log.debug("conexion successfull");
                app.use(session({
                    "store": new MongoStore({
                        "dbPromise": conn,
                        "ttl": 60 * 60
                    }),
                    "secret": settings.session.mongodbPassword,
                    "saveUninitialized": true,
                    "resave": false,
                    "cookie": {
                        "path": "/",
                        "httpOnly": true,
                        "secure": true,
                        "maxAge": 60 * 60 * 1000
                    },
                    "name": "id"
                }));

            });

    } catch (err) {

        log.error(err);

    }

};

export default sessionManagementConfig;

