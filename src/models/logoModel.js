const mongoose = require("mongoose");

const {Schema,model} = mongoose;


const logoSchema = new Schema({
    logo: {
        type : String,
    }
},{timestamps: true,versionKey:false});

const logoModel = model("logo", logoSchema); 

module.exports = logoModel;