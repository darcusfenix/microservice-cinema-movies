import movieSchema        from "./movieModel";
import connectionProvider from "../dataAccess/connectionProvider";
import {serverSettings} from "../config/config";

export const getMovieModel = async function() {
    try {

        const conn = await connectionProvider(serverSettings.mongodbUrl, serverSettings.mongodbDatabase);
        return conn.model("movie", movieSchema);

    } catch (err) {

        throw err;

    }

};
