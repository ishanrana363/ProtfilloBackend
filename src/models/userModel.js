const mongoose = require('mongoose');
const {Schema,model} = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
    },
    password : {
        type : String,
        set : (v)=> bcrypt.hashSync(v,bcrypt.genSaltSync(10))
    },
    img : {
        type : String,
    },
    role : {
        type : String,
        default : 'user',
        enum : ['user','admin'],
    }
},{timestamps:true,versionKey:false});

const userModel = model("users", userSchema);

module.exports = userModel;