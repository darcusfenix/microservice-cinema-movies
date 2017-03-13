import mongoose from "mongoose";

const Schema = mongoose.Schema,
    movieSchema = new Schema({
        "title": {
            "type": String
        },
        "duration": {
            "type": Number
        },
        "description": {
            "type": String
        },
        "imageUrl": {
            "type": String,
            "default": "http://lorempixel.com/300/400"
        },
        "userRate": {
            "type": Number,
            "default": 0
        },
        "rate": {
            "type": String
        },
        "active": {
            "type": Boolean,
            "default": true
        }

    });

export default mongoose.model("movie", movieSchema);
