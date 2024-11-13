const mongoose = require('mongoose');

const {Schema,model} = mongoose;


const stackSchema = new Schema({
    categories: {
        type : String,
    },
    name : {
        type : String,
    },
    img : {
        type : String,
    },
    description : {
        type : String,
    },
    video : {
        type : String,
    },
},{timestamps: true,versionKey: false});

const stackModel = model("stack", stackSchema);

module.exports = stackModel;