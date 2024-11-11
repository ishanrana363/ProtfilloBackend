const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const blogSchema = new Schema({
    name : {
        type : String,
    },
    url : {
        type : String,
    },
    img : {
        type : String,
    },
    description : {
        type : String,
    },
},{timestamps: true,versionKey : false });

const blogModel = model("blog", blogSchema);

module.exports = blogModel;