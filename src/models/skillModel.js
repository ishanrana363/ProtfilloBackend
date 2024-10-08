const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const skillSchema = new Schema({
    name : {
        type : String,
    },
    img : {
        type : String,
    }
},{timestamps:true,versionKey:false});

const skillModel = model("Skills",skillSchema);

module.exports = skillModel;