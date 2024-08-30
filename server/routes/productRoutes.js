import express from 'express'
import { createProduct, deleteProduct, fetchAllProducts,fetchProduct,updateProduct,createProductReview } from '../controllers/productControllers.js';
import { protect,admin } from '../middleware/authMiddleware.js';

const router = express.Router();

//route 1: Get method:Fetch all Products 
router.route('/').get(fetchAllProducts);
//route 2 : Get method: Fetch product by id
router.route('/:id').get(fetchProduct);
//route 3: POST ,create a product
router.post('/',protect,admin,createProduct);
//route 4: PUT method: update product by id
router.route('/:id').put(protect,admin,updateProduct);
//route 5: DELETE method: delete product by id
router.route('/:id').delete(protect,admin,deleteProduct);
//route 5: POST method: create product review by id
router.route('/:id/reviews').post(protect,createProductReview);

export default router;