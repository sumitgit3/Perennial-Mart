import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, //reference to the user who gave the review
}, { timestamps: true });

const productSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, //reference to the user who added this product,The ref contains the name of the model that the ObjectId refers to.
    name: { type: String, required: true },
    image: { type: String, required: true }, //contain address of image
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema], //[]means multiple reviews will be there ,inside array is given a schema of what will be stored
    rating: { type: Number, required: true, default: 0 }, //default is given when no rating is entered,it means it has 0 rating
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 }
},
    { timestamps: true }  //add timestamps to product creation and updation
);

const Product = new mongoose.model('Product', productSchema);  //create a Product model using product Schema

export default Product;