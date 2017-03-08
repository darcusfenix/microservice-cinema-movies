import webpack from "webpack";
import webpackConfigDev from "../../webpack.config.dev";

const compile = webpack(webpackConfigDev),
    webpackConfig = (app) => {

        app.use((req, res, next) => {

            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods",
                "PUT, GET, POST, DELETE, OPTIONS");
            next();

        });

        app.use(require("webpack-dev-middleware")(compile, {
            "noInfo": true,
            "publicPath": webpackConfigDev.output.publicPath
        }));

        app.use(require("webpack-hot-middleware")(compile));

    };

export default webpackConfig;
