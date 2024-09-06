import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/Order.js'
import Razorpay from 'razorpay'
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils.js';
//@desc create a razorpay order
//@route  POST /api/payment/:id
//access : PRIVATE
const createPaymentOrder = asyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
      var instance = new Razorpay({
        key_id: `${process.env.RAZORPAY_KEY_ID}`,
        key_secret: `${process.env.RAZORPAY_KEY_SECRET}`,
      });
      const options = {
        "amount": Math.round(order.totalPrice * 100),
        "currency": "INR",
        "receipt": order._id.toString(),
      }
        const response = await instance.orders.create(options);
        res.status(201).json({
          orderId : response.id,
          currency : response.currency,
          amount : response.amount
        });
    }
    else{
      res.status(404);
      throw new Error('Order not found');
    }
  });
  


  //@desc get key id
  //@route GET /api/payment
  //access : PRIVATE
  const getRazorPayKeyId = asyncHandler(async(req,res)=>{
    res.status(200).json({id:`${process.env.RAZORPAY_KEY_ID}`});
  })

  //@desc verify payment
  //@route GET /api/payment/:id
  //access : PRIVATE
const verifyPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
    const secret = `${process.env.RAZORPAY_KEY_SECRET}`
  
    const valid  = validatePaymentVerification({"order_id": razorpay_order_id, "payment_id": razorpay_payment_id }, razorpay_signature, secret);
  
    if (valid) {
      res.status(200).json({ success: true, message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
  });


  export {createPaymentOrder,getRazorPayKeyId,verifyPayment};


  