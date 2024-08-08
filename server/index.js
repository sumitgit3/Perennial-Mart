import express from 'express'
import { connect } from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();
import products from './DummyProduct.js';

//create express server instance
const app = express();
const port = process.env.PORT;

//connect to database
connect(process.env.MONGO_URI)
.then((res)=>{console.log("Connected to database")})
.catch((err)=>{console.log("Connection to database failed")});

//middleware->It reads the JSON payload from the request body, converts it into a JavaScript object, and attaches this object to the req.body property.
app.use(express.json());

//routes
app.get('/api/products',(req,res)=>{
    res.json(products);
})
app.get('/api/products/:id',(req,res)=>{
    const product = products.find((product)=>product._id === req.params.id);
    res.json(product);
})

//server listening
app.listen(port,()=>{
    console.log('Server listening on port:'+port);
})