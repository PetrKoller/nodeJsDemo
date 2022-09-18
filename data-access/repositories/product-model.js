const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    _id: String,
    name: String,
    price: Number,
    additionalInfo: String,
    updated: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
