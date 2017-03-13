import bodyParser from "body-parser";
import express from "express";
import expressValidator from "express-validator";
import log4js from "log4js";
import helmet from "helmet";
import spdy from "spdy";
import open from "open";

import {serverSettings} from "./config/config";
import createSessionMongo from "./config/sessionServerConfig";
import manageErrorHttpConfig from "./config/manageErrorHttpConfig";
import staticMimesConfig from "./config/staticMimeConfig";
import apiRouteConfig from "./config/apiRoutesConfig";

const app = express(),
    log = log4js.getLogger("app");

createSessionMongo(app)
    .then(() => {

        app.use(helmet());
        app.use(log4js.connectLogger(log4js.getLogger("http"), {"level": "auto"}));
        app.use(bodyParser.urlencoded({"extended": true}));
        app.use(expressValidator());
        app.use(bodyParser.json());

        staticMimesConfig(express);
        apiRouteConfig(app);
        manageErrorHttpConfig(app);

        app.listen(serverSettings.port, (err) => {

            if (err) {

                console.log(err);

            } else {

                let message = `SE INICIÓ EL SERVIDOR EN EL PUERTO:  ${serverSettings.port}`;
                console.log(message);

            }

        });





    })
    .catch((err) => {

        log.error(err);

    });

module.exports = app;
