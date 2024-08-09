import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js'

//@desc Fetch All Products
//@route /api/products
//access : PUBLIC
const fetchAllProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find(); //fetch all documents from collection
    res.json(products);

});
//@desc Fetch  a Product
//@route /api/products/:id
//access : PUBLIC
const fetchProduct = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
        res.json(product);
    }
    else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

export {fetchAllProducts,fetchProduct};