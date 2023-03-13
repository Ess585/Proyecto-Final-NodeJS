const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = Schema({

    user: {type : Schema.Types.ObjectId, ref: 'Users'},
    products: [{
        product: {type: Schema.Types.ObjectId, ref: 'Products'},
        quantity: Number,
        subTotal: Number
    }],
    total: Number,
    Fdate: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Invoice', InvoiceSchema);