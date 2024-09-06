import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import { createPaymentOrder,getRazorPayKeyId, verifyPayment } from '../controllers/paymentController.js'

const router = express.Router();

//route 1 : Method POST ,create payment order
router.route('/:id').post(protect,createPaymentOrder);
//route 2 : Method get , get key id
router.route('/').get(protect,getRazorPayKeyId);
//route 3: Method post , verify payment
router.route('/verify').post(protect,verifyPayment);
export default router;