const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarritoSchema = Schema({

    user: {type : Schema.Types.ObjectId, ref: 'Users'},
    products:[{
        producto: {type: Schema.Types.ObjectId, ref: 'Products'},
        quantity: Number,
        subTotal: Number,
    }],
    total: Number
});

module.exports = mongoose.model('Carritos', CarritoSchema);