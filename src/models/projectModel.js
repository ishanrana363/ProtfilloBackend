const mongoose = require('mongoose');
const { Schema,model } = mongoose;


const ProjectSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    img : {
        type: String,
    },
    url : {
        type: String,
    },
    documentation : {
        type: String,
    },

},{versionKey:false,timestamps:true});

const projectModel = model("Projects",ProjectSchema);


module.exports = projectModel;
