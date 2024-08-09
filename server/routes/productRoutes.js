import express from 'express'
import { fetchAllProducts,fetchProduct } from '../controllers/productControllers.js';

const router = express.Router();

//route 1: Get method:Fetch all Products 
router.route('/').get(fetchAllProducts);
//route 2 : Get method: Fetch product by id
router.route('/:id').get(fetchProduct);


export default router;