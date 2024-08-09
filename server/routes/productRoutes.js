import express from 'express'
import Product from '../models/productModel.js'
import asyncHandler from '../middleware/asyncHandler.js';
const router = express.Router();

//route 1: Get method:Fetch all Products 
router.get('/', asyncHandler(async (req,res)=>{
    const products = await Product.find(); //fetch all documents from collection
    res.json(products);
}));
//route 2 : Get method: Fetch product by id
router.get('/:id',asyncHandler( async (req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(product){
        res.json(product);
    }
    else {
        res.status(404);
        throw new Error('Resource not found');
    }
        
}));


export default router;