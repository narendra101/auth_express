import mongoose from "mongoose";
import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name Is Required"],        
    },
    lastName: {
        type: String,
        required: [true, 'Last Name Is Required' ],        
    },
    username: {
        type: String,
        required: [true, "Username Is Required"],        
        minLength: [8, "username Must Be Atleast 8 Charactors"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password Is Required"],       
        minLength: [8, "Password Must Be Atleast 8 Charactors"] 
    },
    createdDate: {
        type: Date,
        default: new Date,
    },
    email: {
        type: String,
        validate: [validator.isEmail, "Invalid Email"],
        required: [true, "Email Is Required"],
        unique: true,        
        
    }
})
userSchema.plugin(uniqueValidator)

const User = mongoose.model("User", userSchema)

export default User