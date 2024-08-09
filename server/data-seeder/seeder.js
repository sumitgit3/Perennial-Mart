//script to feed the database from dummy data
import mongoose from "mongoose";
import colors from 'colors' //color the console.log()
import dotenv from 'dotenv'
dotenv.config();
//data to feed
import products from './productSeeds.js';
import users from "./userSeeds.js";
//data models
import User from '../models/userModel.js'
import Product from '../models/productModel.js'
import Order from '../models/Order.js'

//connect to DB
mongoose.connect(process.env.MONGO_URI)
.then((e)=>{console.log("Connected to database".green.inverse)})
.catch((e)=>{console.log("Connection to database failed").red.inverse});

//function to import data to DB
const importData = async()=>{
    try {
        //destroy previous data before import data to db
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        // Insert users first because products might reference users (like the admin user)
        const createdUser =  await User.insertMany(users);
        //take admin _id to reference in product
        const adminId = createdUser[0]._id;

        //add reference to admin user in product array of objects
        const sampleProducts = products.map((product)=>{
            return {...product,user:adminId}
        });

        //import products to db
        await Product.insertMany(sampleProducts);

        console.log('Data imported'.green.inverse);
        process.exit();//process.exit() is used to close script after it is done its work(not used in server otherwise it will close server),it close mongoDB connection and other cleanup task
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

//function to destroy database
const destroyData = async ()=>{
    try {
        //destroy data
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log('Data Destroyed'.yellow.inverse);
        process.exit();
        
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

//Check if the third command-line argument is '-d'
if(process.argv[2] === '-d'){
    destroyData();
}
else {
    importData();
}