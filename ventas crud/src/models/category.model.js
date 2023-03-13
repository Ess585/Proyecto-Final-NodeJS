'use strict'

const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = Schema({
    nameCategory: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    allProducts:[{
        type: Schema.Types.ObjectId, 
        ref:'Products'}]
});

module.exports = mongoose.model('Categorys', CategorySchema);