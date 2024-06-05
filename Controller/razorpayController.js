const asyncHandler = require('express-async-handler');
const Razorpay = require('razorpay');
const crypto = require('crypto')

const razorpayKeyId = 'rzp_test_RP9jKB0e45QR7x'
const razorpayKeySecret = 'tJ3FfCssvJOJfHejrzBXiK5H'

console.log(razorpayKeyId,'the id ')
exports.order = asyncHandler(async(req,res) => {
 try {
    const razorpay = new Razorpay({
       key_id: razorpayKeyId,
       key_secret: razorpayKeySecret
    })
    
    if(!req.body){
        return res.status(400).send('Error req body not found')
    }
    const options = req.body
    const order = await razorpay.orders.create(options)
    if(!order){
        return res.status(401).send('Error while creating order')
    }
    res.json(order)
 } catch (error) {
    console.log(err)
    res.status(500).send('An error occured');
 }
})

exports.validate = asyncHandler(async(req,res)=>{
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body

    const sha = crypto.createHmac("sha256", razorpayKeySecret);
    // order_id + " | " + razorpay_payment_id

    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);

    const digest = sha.digest("hex");

    if (digest!== razorpay_signature) {
        return res.status(400).json({msg: " Transaction is not legit!"});
    }

    res.json({msg: " Transaction is legit!", orderId: razorpay_order_id,paymentId: razorpay_payment_id});
})