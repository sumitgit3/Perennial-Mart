import express from 'express'
import { connect } from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();
import productRouter from './routes/productRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

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

//route not found middleware //only catches requests no other middleware has handled
app.use(notFound);
//custom error handler should be last middleware in the stack ,so it catches any error occur while request processing
app.use(errorHandler);//This middleware will only be executed if an error is passed to it, either by throwing an error in an async function or by calling next(error)
//server listening
app.listen(port,()=>{
    console.log('Server listening on port:'+port);
})