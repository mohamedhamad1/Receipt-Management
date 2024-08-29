const Product = require('../models/products_M')

const homePage = (req, res)=>{
    res.render('home')
} 


module.exports = {
    homePage,
}