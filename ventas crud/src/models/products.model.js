"use strict"

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = Schema({
    nameProduct: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Productos", ProductSchema);