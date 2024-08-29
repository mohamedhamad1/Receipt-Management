const Receipt = require('../models/receipts_M')
const Product = require('../models/products_M')
const { map } = require('jquery')

const create_receipt_page = async(req, res)=>{
    const products = await Product.find({})

    res.render('create_receipt',{
        products
    })
} 

const saved_receipts = async (req, res) => {
    try {
        const receipts = await Receipt.find({});
        const products = await Product.find({});
        
        const myMap = new Map();
        
        receipts.forEach(receipt => {
            receipt.products.forEach(product => {
                myMap.set(product.productName, (myMap.get(product.productName) || 0) + product.quantity);
            });
        });

        let mapArray = [...myMap];

        const summaries = await Promise.all(mapArray.map(async ([key, quantity]) => {
            const product = await Product.findOne({ productName: key });
            if (!product) {
                return {
                    productName: key,
                    productQuantity: quantity,
                    totalPrice: 0
                };
            }
            return {
                productName: key,
                productQuantity: quantity,
                totalPrice: quantity * product.productPrice
            };
        }));

        let totalyPrice = 0
        receipts.forEach(receipt => {
            totalyPrice+=receipt.receiptPrice
        });
        let capital = 0
        summaries.forEach(summary => {
            capital+=summary.totalPrice
        });
        let bounty = totalyPrice - capital
        console.log(summaries);

        res.render('saved_receipts', {
            receipts,
            summaries,
            totalyPrice,
            capital,
            bounty
        });

    } catch (error) {
        console.error('Error fetching receipts or products:', error);
        res.status(500).send('Internal Server Error');
    }
};


const post_receipt = async(req, res)=>{

    try{
        const {products, receiptPrice} = req.body
        
        const newReceipt = new Receipt({
            products,
            receiptPrice
        })
        await newReceipt.save()

        res.status(201).json({message: 'receipt saved successfully'})
    }catch{
        res.status(500).json({message: 'error during save receipt'})
    }
    
} 

module.exports = {
    create_receipt_page,
    saved_receipts,
    post_receipt,
}