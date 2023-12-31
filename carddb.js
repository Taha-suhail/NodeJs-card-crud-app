const mongoose = require("mongoose");

const Schema =mongoose.Schema;
const cardSchema = new Schema({
    imgurl:String,
    author:String,
    description: String,
    createdAt:{
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("Card",cardSchema);