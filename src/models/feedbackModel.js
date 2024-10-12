const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const feedbackSchema = new Schema({
    name : {
        type : String,
    },
    img : {
        type : String,
    },
    feedback : {
        type : String,
    },
},{timestamps: true,versionKey : false});

const feedbackModel = model("feedback", feedbackSchema);

module.exports = feedbackModel;