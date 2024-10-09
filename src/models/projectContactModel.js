const mongoose = require('mongoose');
const {Schema , model} = mongoose;


const projectContactSchema = new Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
        lowercase : true,
    },
    description : {
        type : String,
    },
    project_link : {
        type : String,
    },
    isShow :{
        type : Boolean,
        default : false,
    }
},{timestamps:true,versionKey: false});

const projectContactModel = model("projectContactData",projectContactSchema);

module.exports = projectContactModel;