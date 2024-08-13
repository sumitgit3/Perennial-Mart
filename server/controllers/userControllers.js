import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
//@desc auth user and send token /login
//@route POST /api/users/login
//access : PUBLIC
const authUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))) { //only check password after checking user Exist, model method can be used by its object
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{
            expiresIn:'30d'
        });
        //set JWT as HTTP only cookie
        res.cookie('jwt',token, {
            httpOnly:true,
            secure:process.env.NODE_ENV !== 'development',
            sameSite:'strict',
            maxAge:30*24*60*60*1000 //30days
        });
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        });
    }
    else {
        res.status(401);//unauthorized
        throw new Error("Invalid email or password");
    }
});

//@desc register
//@route POST /api/users/
//access : PUBLIC
const registerUser = asyncHandler(async(req,res)=>{
    res.send('register user');
});

//@desc logout clear cookie
//@route POST /api/users/logout
//access : PRIVATE
const logoutUser = asyncHandler(async(req,res)=>{
    res.send('logout user');
});
//@desc get user profile
//@route GET /api/users/profile
//access : PRIVATE
const getUserProfile = asyncHandler(async(req,res)=>{  //no need to pass id,it will taken from HTTP cookie
    res.send('get user profile');
});

//@desc update user profile
//@route PUT /api/users/profile
//access : PRIVATE
const updateUserProfile = asyncHandler(async(req,res)=>{
    res.send('update user profile');
});

//@desc get users profile
//@route GET /api/users/
//access : PRIVATE/admin
const getUsers = asyncHandler(async(req,res)=>{
    res.send('get users profile');
});

//@desc get user profile by id
//@route GET /api/users/:id
//access : PRIVATE/admin
const getUserByID = asyncHandler(async(req,res)=>{
    res.send('get user by id');
});

//@desc delete user by id
//@route DELETE /api/users/:id
//access : PRIVATE/admin
const deleteUser = asyncHandler(async(req,res)=>{
    res.send('delete user');
});

//@desc update user by id
//@route PUT /api/users/:id
//access : PRIVATE/admin
const updateUser = asyncHandler(async(req,res)=>{
    res.send('update user');
});

export  {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    // admin controller
    getUsers,
    getUserByID,
    deleteUser,
    updateUser
}
