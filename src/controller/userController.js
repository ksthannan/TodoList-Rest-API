// import model 
const profileModel = require('../models/profileModel')

// import json web token
const jwt = require('jsonwebtoken');

// user registration
exports.userRegistration = (req, res)=>{
    let reqBody = req.body
    profileModel.create(reqBody, (err, data)=>{
        if(err){
            res.status(400).json({status: "failed", data: err})
        }else{
            res.status(200).json({status: "success", data: data}) 
        }
    });
}

// user login
exports.userLogin = (req, res)=>{
    let reqBody = req.body
    let userName = reqBody['username']
    let password = reqBody['password']
    let filter = {
        "username": userName,
        "password": password,
    }
    let projection = "username email firstName lastName city state country mobile interest"
    profileModel.find(filter, projection, (err, data)=>{
        if(!err){
            if(!data.length){
                res.status(400).json({status: "unauthorized", data: data})
            }else{
                const payload = {
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                    data: data
                }
                const token = jwt.sign(payload, 'shhhh354365dfsh');
                res.status(200).json({status: "success", token: token, data: data}) 
            }
        }else{
            res.status(400).json({status: "Oops! Something went wrong", data: err})
        }
    });
}

// view profile
exports.viewProfile = (req, res)=>{
    let username = req.headers.username
    profileModel.find({"username":username}, (err, data)=>{
        if(err){
            res.status(400).json({status: "faild", data: err})
        }else{
            res.status(200).json({status: "success", data: data})
        }
    });

}

// update profile
exports.updateProfile = (req, res)=>{
    let username = req.headers.username
    let reqBody = req.body
    profileModel.updateOne({"username":username}, reqBody, (err, data)=>{
        if(err){
            res.status(400).json({status: "faild", data: err})
        }else{
            res.status(200).json({status: "success", data: data})
        }
    });

}