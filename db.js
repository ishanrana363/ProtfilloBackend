const mongoose = require('mongoose');

require('dotenv').config();

const dbPort = process.env.MONGO_URI;

const connectDb = () =>{
    try {
        mongoose.connect(dbPort);
        console.log(`---MongoDB Connected Successfully.---`);
    }catch (e) {
        console.log(`---MongoDB Connection Error: ${e}----`);
    }
};

module.exports = connectDb