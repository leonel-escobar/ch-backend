const mongoose = require("mongoose")
const productSchema = require("../models/productSchema")

const orderSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    products: [productSchema]
}, { timestamps: true });

module.exports = orderSchema;