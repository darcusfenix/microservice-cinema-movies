import path from "path";
import nodeExternals from "webpack-node-externals";

const entry = path.resolve(__dirname, "src/server.es6"),
    rules = [
        {"test": /\.(es6)$/, "exclude": /node_modules/, "use": "babel"}
    ], output = {
        "path": path.resolve(__dirname, "src"),
        "publicPath": "/",
        "filename": "bundle.js"
    }, extensions = [".js", ".es6", ".json"];

export default {
    "entry": entry,
    "output": output,
    "module": {
        "rules": rules
    },
    "resolve": {
        "extensions": extensions
    }
};
