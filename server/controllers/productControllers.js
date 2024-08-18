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
//@desc Create a Product
//@route POST /api/products/
//access : PRIVATE/ADMIN
const createProduct = asyncHandler(async(req,res)=>{
   const product = new Product({
    name:'Sample name',
    price:0,
    user:req.user._id,
    image:'/images/sample.jpg',
    brand:'sample Brand',
    category:'Sample Category',
    countInStock:0,
    numReviews:0,
    description:'Sample description'
   });
   const newProduct =await product.save();
   res.status(201).json(newProduct);

});

export {fetchAllProducts,fetchProduct,createProduct};