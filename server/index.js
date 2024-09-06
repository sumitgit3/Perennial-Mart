import express from 'express'
import { connect } from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import uploadRouter from './routes/uploadRoutes.js'
import paymentRouter from './routes/paymentRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser'
import path from 'path'

//create express server instance
const app = express();
const port = process.env.PORT;

//connect to database
connect(process.env.MONGO_URI)
.then((res)=>{console.log("Connected to database")})
.catch((err)=>{console.log("Connection to database failed")});

//middleware->It reads the JSON payload from the request body, converts it into a JavaScript object, and attaches this object to the req.body property.
app.use(express.json());
//urlencoder parser middleware
app.use(express.urlencoded({extended:true}));
//cookie parser middleware
app.use(cookieParser());


//product route -> use express router middleware
app.use('/api/products',productRouter);
//user route
app.use('/api/users',userRouter);
//order route
app.use('/api/orders',orderRouter);
//upload route
app.use('/api/upload',uploadRouter);
//payment route
app.use('/api/payment',paymentRouter);

//setting upload folder static
const __dirname = path.resolve(); //set __dirname to current directory in es module
//first paramter is base url which will be used to serve static files,second is the middleware to make upload folder static
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static(path.join(__dirname,'../client/build')));

    //any route that is not api will be redirected to index.html
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}
else {
    app.get('/',(req,res)=>{
        res.send('API is running');
    });
}


//route not found middleware //only catches requests no other middleware has handled
app.use(notFound);
//custom error handler should be last middleware in the stack ,so it catches any error occur while request processing
app.use(errorHandler);//This middleware will only be executed if an error is passed to it, either by throwing an error in an async function or by calling next(error)
//server listening
app.listen(port,()=>{
    console.log('Server listening on port:'+port);
})