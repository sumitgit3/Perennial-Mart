import express from 'express'
import { 
    addOrderItems,
    getMyOrder,
    updateOrderToPaid,
    //ADMIN
    getOrderById,
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

//Admin routes

//route 4 : PUT Method : update order to delivered
router.put('/:id/delivered',protect,admin,updateOrderToDelivered);
//route 5: GET Method : get order by id
router.route('/:id').get(protect,admin,getOrderById);
//route 6:GET Method : get all order details
router.route('/').get(protect,admin,getAllOrders);


export default router;