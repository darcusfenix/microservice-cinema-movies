import cors from "cors";
import movieRouter from "../movie/movieRouter";

export default function apiRoutesConfig(app) {

    app.use(cors());
    app.use(movieRouter);


}
