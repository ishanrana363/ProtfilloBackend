const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const blogSchema = new Schema({
    name : {
        type : String,
    },
    url : {
        type : String,
    },
    description : {

    },
},{timestamps: true,versionKey : false });

const blogModel = model("Blog", blogSchema);

module.exports = blogModel;