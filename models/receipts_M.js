const mongoose = require('mongoose')
const receiptSchema = new mongoose.Schema({
    products:[{
        productName:{type: String},
        quantity:{type: Number},
        unitPrice:{type: Number},
        total:{type: Number},
    }],
    receiptPrice:{type: Number},
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Receipt', receiptSchema)