import mongoose from 'mongoose'
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
        
    },
    role:{
        type:String,
        default:"user",
        enum: ["user", "admin"],
        
    }
})
export const User = mongoose.model("User",UserSchema);