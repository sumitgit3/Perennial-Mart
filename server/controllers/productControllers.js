import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js'

//@desc Fetch All Products
//@route GET /api/products
//access : PUBLIC
const fetchAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find(); //fetch all documents from collection
  res.json(products);

});
//@desc Fetch  a Product
//@route GET /api/products/:id
//access : PUBLIC
const fetchProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
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
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description'
  });
  const newProduct = await product.save();
  res.status(201).json(newProduct);

});
//@desc update Product
//@route PUT /api/products/:id
//access : PRIVATE/ADMIN
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found')
  }
});
//@desc delete Product
//@route DELETE /api/products/:id
//access : PRIVATE/ADMIN
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({_id:`${req.params.id}`});
    res.status(200).json({message:'Product Deleted'});
  }
  else {
    res.status(404);
    throw new Error('Product not found')
  }
});

//@desc create a review
//@route POST /api/products/:id/reviews
//access : PRIVATE
const createProductReview = asyncHandler(async (req, res) => {
  const {comment,rating} = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find((review)=>review.user.toString() === req.user._id.toString());
    if(alreadyReviewed){
      res.status(400);
      throw new Error('Product Already reviewed');
    }
    
    const review = {
      name : req.user.name,
      rating:Number(rating),
      comment,
      user:req.user._id
    }
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc,review)=>acc+review.rating,0)/product.numReviews;
    await product.save();
    res.status(201).json({message:'Review Added'});
  }
  else {
    res.status(404);
    throw new Error('Product not found')
  }
});

export { fetchAllProducts, fetchProduct, createProduct, updateProduct ,deleteProduct,createProductReview};