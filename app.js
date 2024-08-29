require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser');
const receiptController = require('./controllers/receipts_C')
const dbconnect = require('./config/db')

// ========================START APPLICATION======================= //

const app = express()

app.use(bodyParser.json())

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/',(req,res)=>{res.render('home')})

app.route('/create_receipt')
    .get(receiptController.create_receipt_page)
    .post(receiptController.post_receipt)


app.route('/saved_receipts')
    .get(receiptController.saved_receipts)


app.listen(process.env.PORT,()=>{
    console.log(`server running on http://localhost:${process.env.PORT}/`);
})