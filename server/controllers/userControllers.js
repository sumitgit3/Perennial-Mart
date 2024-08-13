import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js'

//@desc auth user and send token /login
//@route POST /api/users/login
//access : PUBLIC
const authUser = asyncHandler(async(req,res)=>{
 res.send('auth user');
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
