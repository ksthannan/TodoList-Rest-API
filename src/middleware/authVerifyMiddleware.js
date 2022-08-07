// import json web token
const jwt = require('jsonwebtoken')

// moddleware for verify json web token 
module.exports = (req, res, next)=>{
    let token = req.headers['token']
    jwt.verify(token, 'shhhh354365dfsh', (err, decoded)=>{
        if(err){
            res.status(400).json({status: "unauthorized", data: err})
        }else{
            // Get username from decoded token and add with req header 
            let username = decoded['data'][0]['username']
            req.headers.username = username
            next()
        }
    })
}