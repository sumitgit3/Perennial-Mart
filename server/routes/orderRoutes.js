import express from 'express'
import { 
    addOrderItems,
    getMyOrder,
    updateOrderToPaid,
    getOrderById,
    //ADMIN
    updateOrderToDelivered,
    getAllOrders
    } from '../controllers/orderControllers.js'
import { protect,admin } from '../middleware/authMiddleware.js';

const router = express.Router();

//route 1: POST method: create an order
router.route('/').post(protect,addOrderItems);
//route 2 : GET method: get my orders
router.route('/myorders').get(protect,getMyOrder);
//route 3 : PUT method : update order to paid
router.put('/:id/pay',protect,updateOrderToPaid);
//route 4: GET Method : get order by id
router.route('/:id').get(protect,getOrderById);

//Admin routes

//route 5 : PUT Method : update order to delivered
router.put('/:id/delivered',protect,admin,updateOrderToDelivered);
//route 6:GET Method : get all order details
router.route('/').get(protect,admin,getAllOrders);


export default router;