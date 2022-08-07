// require packages
const express = require('express')
const mongoose = require('mongoose')
const app = new express()
const router = require('./src/routes/api')
const bodyParser = require('body-parser')

// Middleware implement



const cors = require('cors')
const hpp = require('hpp');
const helmet = require("helmet")
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')

const rateLimit = require('express-rate-limit')

app.use(cors())
app.use(hpp())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

// parse application/json
app.use(bodyParser.json())

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(limiter)


app.use('/api/v1', router)

// Undefined Route
app.use('*', (req, res) =>{
    res.status(404).json({
        status: "Failed",
        data: "Not Found"
    })
})


let URI = 'mongodb://127.0.0.1:27017/Todo';
let OPTION = {user: '', pass: '', autoIndex: true}

mongoose.connect(URI, OPTION, (error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("Mongodb connection success");
    }
});



module.exports = app