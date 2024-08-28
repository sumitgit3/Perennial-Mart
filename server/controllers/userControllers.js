import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js'
import { generateToken } from '../utils/generateToken.js';

//@desc auth user and send token /login
//@route POST /api/users/login
//access : PUBLIC
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) { //only check password after checking user Exist, model method can be used by its object
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
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
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    //check if user exist
    const userExist =await User.findOne({ email });
    if (!userExist) {
        const user = await User.create({
            name,
            email,
            password
        });

        if (user) {
            generateToken(res, user._id);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            });
        }
        else {
            res.status(400);//client error
            throw new Error('Invalid data');
        }
    } 
    else {
        res.status(400);//client error
        throw new Error('User already exists');
    }
});

//@desc logout clear cookie
//@route POST /api/users/logout
//access : PRIVATE
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0) //set date to past to clear cookie from browser
    });
    res.status(200).json({ message: 'Log out successfully' });
});
//@desc get user profile
//@route GET /api/users/profile
//access : PRIVATE
const getUserProfile = asyncHandler(async (req, res) => {  //no need to pass id,it will taken from HTTP cookie
    const user = await User.findById(req.user._id);
    //if user exist
    if(user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }
    else{
        req.status(404);
        throw new Error('User not Found');
    }
});

//@desc update user profile
//@route PUT /api/users/profile
//access : PRIVATE
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser =await user.save(); //saving so mongoose pre hasing method run
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    }
    else {
        req.status(404);
        throw new Error('User not Found');
    }
});

//@desc get users profile
//@route GET /api/users/
//access : PRIVATE/admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password');
    res.status(200).json(users);
});

//@desc get user profile by id
//@route GET /api/users/:id
//access : PRIVATE/admin
const getUserByID = asyncHandler(async (req, res) => {
    const user = await User.findById({_id:`${req.params.id}`}).select('-password');
    if (user) {
        res.status(200).send(user);
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }

});

//@desc delete user by id
//@route DELETE /api/users/:id
//access : PRIVATE/admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById({_id:`${req.params.id}`});
    if(user){
        if(user.isAdmin){
            res.status(400);//client error
            throw new Error('Admin user cannot be Deleted');
        }
        else{
            await User.deleteOne({_id:`${req.params.id}`});
            res.status(200).json({message:'User Deleted'});
        }   
    }
    else{
        res.status(404);
        throw new Error('User not found');
    }
});

//@desc update user by id
//@route PUT /api/users/:id
//access : PRIVATE/admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updatedUser =await user.save(); //saving so mongoose pre hasing method run
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    }
    else {
        req.status(404);
        throw new Error('User not Found');
    }
});

export {
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
