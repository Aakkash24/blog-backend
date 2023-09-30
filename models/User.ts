import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    uname:{
        type:String,
        require:true,
        unique:true
    },
    uemail:{
        type:String,
        require:true,
        unique:true,
    },
    upassword:{
        type:String,
        require:true,
        min:8
    },
},{timestamps:true})

const User = mongoose.model("User", UserSchema);
export default User;