
const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    productName:String,
    productPrice:Number,
})

module.exports = mongoose.model('Product', productSchema)