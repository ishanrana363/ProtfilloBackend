const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const userSchema = new Schema({
    name : {
        type : String,
    },
    img : {
        type : String,
    }
},{timestamps:true,versionKey: false});

const serviceModel =  model("service", userSchema);

module.exports = serviceModel;