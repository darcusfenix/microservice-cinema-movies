import bodyParser from "body-parser";
import express from "express";
import expressValidator from "express-validator";
import log4js from "log4js";
import helmet from "helmet";

import {serverSettings} from "./config/config";
import createSessionMongo from "./config/sessionServerConfig";
import manageErrorHttpConfig from "./config/manageErrorHttpConfig";
import apiRouteConfig from "./config/apiRoutesConfig";

log4js.configure(__dirname +'/'+ 'log4js.json');

const app = express(),
    log = log4js.getLogger("app");


createSessionMongo(app)
    .then(() => {

        app.use(helmet());
        app.use(log4js.connectLogger(log4js.getLogger("http"), {"level": "auto"}));
        app.use(bodyParser.urlencoded({"extended": true}));
        app.use(expressValidator());
        app.use(bodyParser.json());

        apiRouteConfig(app);
        manageErrorHttpConfig(app);


         app.listen(serverSettings.expressPort,"0.0.0.0", (err) => {

            if (err) {

                console.log(err);

            } else {

                let message = `SE INICIÓ EL SERVIDOR EN EL PUERTO:  ${serverSettings.expressPort}`;
                console.log(message);

            }

        });

    })
    .catch((err) => {

        log.error(err);

    });

module.exports = app;
