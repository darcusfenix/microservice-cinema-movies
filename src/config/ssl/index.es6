import fs from "fs";

export default {
    "key": fs.readFileSync(`${__dirname}/server.key`),
    "cert": fs.readFileSync(`${__dirname}/server.crt`)
};
