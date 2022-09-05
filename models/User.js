const mongoose=require('mongoose');

//Creating Schema
const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
});

//Creating the model for users
module.exports = User = mongoose.model('user',UserSchema);