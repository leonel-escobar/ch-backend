const mongoose = require("mongoose")
const productSchema = require("../models/productSchema")

const cartSchema = new mongoose.Schema({
    products: [productSchema]
}, { timestamps: true });

module.exports = cartSchema;