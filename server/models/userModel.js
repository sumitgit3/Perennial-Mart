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

//function run before saving into data base
// Encrypt password using bcrypt ->will run when user is created or password is changed.(when user is created password is considered to be changed so it runs)
userSchema.pre('save', async function (next) {
    // Check if the password field has been modified
    //this is the document that is about to be saved.
    if (!this.isModified('password')) {
      return next(); //next is the mongoose next middleware calling ->save()
    }
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the generated salt
    this.password = await bcrypt.hash(this.password, salt);
    // Proceed to the next middleware or save operation
    next();
  });

const User = new mongoose.model('User', userSchema);

export default User;