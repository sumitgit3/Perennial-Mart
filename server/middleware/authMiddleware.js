import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";

const protect = asyncHandler(async (req,res,next)=>{
    const token = req.cookies.jwt; //using cookie parser middleware to parse cookie to get the jwt token ,req.cookies not req.cookie
    //if token exist
    if(token) {
        try {
            const {userId} = jwt.verify(token,process.env.JWT_SECRET_KEY); //payload is a object
            req.user = await User.findById(userId).select('-password');
            next();
        } 
        catch (error) {
            res.status(401);//unauthorized;
            throw new Error('Unauthorized,invalid token');
        }
    }
    else {
        res.status(401);//unauthorized;
        throw new Error('Unauthorized,no token');
    }

});

const admin = (req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }
    else {
        res.status(401);//unauthorized
        throw new Error('Unauthorized,not admin');
    }
}

export {protect,admin};