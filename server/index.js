import express from 'express'
import { connect } from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();
import productRouter from './routes/productRoutes.js'

//create express server instance
const app = express();
const port = process.env.PORT;

//connect to database
connect(process.env.MONGO_URI)
.then((res)=>{console.log("Connected to database")})
.catch((err)=>{console.log("Connection to database failed")});

//middleware->It reads the JSON payload from the request body, converts it into a JavaScript object, and attaches this object to the req.body property.
app.use(express.json());

//product route -> use express router middleware
app.use('/api/products',productRouter);

//server listening
app.listen(port,()=>{
    console.log('Server listening on port:'+port);
})