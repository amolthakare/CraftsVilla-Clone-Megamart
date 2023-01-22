const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    image : String,
    name : String,
    price : Number,
    strike : String,
    discount: String,
    userID : String,
    quant : Number
}) 

const CartModel = mongoose.model("cart",cartSchema);

module.exports={
    CartModel,
}