const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const userSchema = new Schema({
    name : {
        type : String,
    },
    title : {
        type : String,
    },
    description : {
        type : String,
    },
    img : {
        type : String,
    }
},{timestamps:true,versionKey: true});

const serviceModel =  model("service", userSchema);

module.exports = serviceModel;