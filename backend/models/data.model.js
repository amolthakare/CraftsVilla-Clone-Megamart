const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    image : String,
    name : String,
    price : Number,
    strike : String,
    discount: String,
    userID : String
}) 

const DataModel = mongoose.model("data",dataSchema);

module.exports={
    DataModel,
}