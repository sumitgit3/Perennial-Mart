import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/Order.js'

//@desc Create new Order
//@route POST /api/orders
//access : PRIVATE
const addOrderItems = asyncHandler(async(req,res)=>{
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice
  } = req.body;
  if (orderItems && orderItems.length ==0) {
    res.status(401);
    throw new Error('No Order Items');
  }
  else {
    const order = new Order({
        user:req.user._id,
        orderItems : orderItems.map((x)=>({...x,product:x._id,_id:undefined})),
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    })
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  }
});

//@desc get logged in user, order details
//@route GET /api/orders/myorders
//access : PRIVATE
const getMyOrder = asyncHandler(async(req,res)=>{
    const myOrder = await Order.find({user:req.user._id});
    res.status(200).json(myOrder);
});

//@desc get order details by id
//@route  GET  /api/orders/:id
//access : PRIVATE/ADMIN
const getOrderById = asyncHandler(async(req,res)=>{
    const order = await Order.find({user:req.params.id}).populate('user','name email');
    if(order){
        res.status(200).json(order);
    }
    else{
        res.status(401);
        throw new Error('Order Not found');
    }
  });

//@desc update order to paid
//@route PUT /api/orders/:id/pay
//access : PRIVATE
const updateOrderToPaid = asyncHandler(async(req,res)=>{
    res.send('update order to paid');
  });

//@desc update order to delivered
//@route PUT /api/orders/:id/delivered
//access : PRIVATE/ADMIN
const updateOrderToDelivered = asyncHandler(async(req,res)=>{
    res.send('update order to delivered');
  });

//@desc get all orders
//@route GET /api/orders
//access : PRIVATE/ADMIN
const getAllOrders = asyncHandler(async(req,res)=>{
    res.send('get all orders');
});

export {
    addOrderItems,
    getMyOrder,
    updateOrderToPaid,
    //ADMIN
    getOrderById,
    updateOrderToDelivered,
    getAllOrders
}
