import ssl from "./ssl/index";

export const serverSettings = {
    "nameServer": "localhost",
    "port": 3000,
    "ssl": ssl,
    "mongodbUrl": "localhost:27017",
    "database": "pets",
    "cache": {
        "password": "bfdf8aba8e784557af145db15f8703c1"
    },
    "session": {
        "password": "1652f8dfa00443589e12afb7ec37f2c5"
    }
};

