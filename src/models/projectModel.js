const mongoose = require('mongoose');
const { Schema,model } = mongoose;


const ProjectSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type: String,
        validate: {
            validator: function(v) {
                return /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]/.test(v);
            },
            message: props => `${props.value} is not a valid email number!`
        },
        required: [true, 'User email number required']
    },
    subject : {
        type: String,
        required: true,
    },
    msg : {
        type: String,
        required: true,
    }

},{versionKey:false,timestamps:true});

const projectModel = model("Projects",ProjectSchema);


module.exports = projectModel;
















