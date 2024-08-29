const express = require('express')
const router = express.Router()
const controllers = require('../controllers/receipts_C')

router.route('/create_receipt')
    .get(controllers.create_receipt)

module.exports = router