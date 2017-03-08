import connectionProvider from "../dataAccess/connectionProvider.es6";
import session  from "express-session";
import mongoStoreFactory  from "connect-mongo";
import log4js from "log4js";

import {serverSettings}   from "./config";

const log = log4js.getLogger("SESSION-MANAGEMENT-MONGO");

const MongoStore = mongoStoreFactory(session);

session.Session.prototype.login = function (user, cb) {

    const req = this.req;
    req.session.regenerate(function (err) {

        if (err) {

            cb(err);

        }

    });
    req.session.userInfo = user;
    cb();

};


const sessionManagementConfig = async(app) => {

    try {

        const conn = await connectionProvider(serverSettings.mongodbUrl, serverSettings.database)
            .then( () => {

                log.debug("conexion successfull");
                app.use(session({
                    "store": new MongoStore({
                        "dbPromise": conn,
                        "ttl": 60 * 60
                    }),
                    "secret": serverSettings.session.password,
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

    }

};

export default sessionManagementConfig;

