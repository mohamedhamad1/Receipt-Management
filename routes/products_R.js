const express = require('express')
const router = express.Router()
const controllers = require('../controllers/products_C')

router.route('/')
    .get(controllers.homePage) 

// module.exports = router