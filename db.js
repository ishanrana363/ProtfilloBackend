const mongoose = require('mongoose');

require('dotenv').config();

const dbPort = process.env.DB_URL;

const connectDb = () =>{
    try {
        mongoose.connect(dbPort);
        console.log(`---MongoDB Connected Successfully.---`);
    }catch (e) {
        console.log(`---MongoDB Connection Error: ${e}----`);
    }
};

module.exports = connectDb