const mongoose = require('mongoose');


const {Schema,model} = mongoose;


const emailSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
    },
    name : {
        type : String,
    },
    phone : {
        type : String,
    },
    msg : {
        type : String,
    }
},{timestamps: true,versionKey:false});


const emailModel = model("Emails", emailSchema);

module.exports = emailModel;