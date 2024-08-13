import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    //one to many relationship with orders,so reference will be in orders
}, { timestamps: true });

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
const User = new mongoose.model('User', userSchema);

export default User;