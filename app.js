const express = require("express")
const rateLimit = require("express-rate-limit")
const xss = require('xss-clean')
const helmet = require("helmet")
const hpp = require('hpp');
const cors = require("cors")
const mongoSanitize = require('express-mongo-sanitize');
var cookieParser = require('cookie-parser')
const path = require("path");
const bodyParser = require('body-parser');
const routes = require("./src/routes/api");
require("dotenv").config();
const dbPort = process.env.MONGO_URI;



const app = new express();

app.set('trust proxy', true);  // <-- এটি যুক্ত করুন

// Rate limit configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

app.use(limiter)

// Using helmet for secure http response

app.use(helmet())

// Using xss-clean sanitize for body query params

app.use(xss())

// Using hpp for protect against HTTP Parameter Pollution attacks query req.body params

app.use(hpp())

// Using cors for enabling CORS

app.use(cors())

// Using MongoSanitize for sanitize user input

app.use(mongoSanitize())


// Using cookie parser for set cookie

app.use(cookieParser())

app.use(bodyParser.json({ limit: '10mb' }));

app.get("/",(req,res)=>{
    res.send(" Protfilio Server is running!");
})

// Connect to MongoDB

const mongoose = require("mongoose");

mongoose.connect(dbPort).then(()=>{
    console.log("Connected to MongoDB")
}).catch((err)=>{
    console.log(err);
})


// api file import

app.use("/api/v1",routes)





module.exports = app