// import model 
const todoModel = require('../models/TodoListModel')

// import json web token
const jwt = require('jsonwebtoken');

// Create todo 
exports.createTodo = (req, res)=>{
    let reqBody = req.body
    reqBody.username = req.headers.username
    reqBody.todoStatus = "New"
    reqBody.todoCreateDate = Date.now()
    reqBody.todoUpdateDate = Date.now()

    todoModel.create(reqBody, (err, data)=>{
        if(err){
            res.status(400).json({status: "failed", data: err})
        }else{
            res.status(200).json({status: "success", data: data}) 
        }
    });
}

// select todo
exports.selectTodo = (req, res)=>{
    let username = req.headers.username
    todoModel.find({"username": username}, (err, data)=>{
        if(err){
            res.status(400).json({status: "failed", data: err})
        }else{
            res.status(200).json({status: "success", data: data}) 
        }
    });
}

// update todo
exports.updateTodo = (req, res)=>{
    let reqBody = req.body
    reqBody.todoUpdateDate = Date.now()
    let username = req.headers.username
    let todoId = reqBody._id
    todoModel.updateOne({"username": username, "_id": todoId}, reqBody, (err, data)=>{
        if(err){
            res.status(400).json({status: "failed", data: err})
        }else{
            res.status(200).json({status: "success", data: data}) 
        }
    });
}

// update status todo
exports.updateStatusTodo = (req, res)=>{
    let reqBody = req.body
    let username = req.headers.username
    let todoId = reqBody._id
    let todoStatus = reqBody.todoStatus
    let todoUpdateDate = Date.now()

    console.log(reqBody)
    todoModel.updateOne({"username": username, "_id": todoId}, {todoStatus: todoStatus, todoUpdateDate: todoUpdateDate}, (err, data)=>{
        if(err){
            res.status(400).json({status: "failed", data: err})
        }else{
            res.status(200).json({status: "success", data: data}) 
        }
    });
}

// remove todo
exports.removeTodo = (req, res)=>{
    let reqBody = req.body
    let username = req.headers.username
    let todoId = reqBody._id
    todoModel.deleteOne({"username": username, "_id": todoId}, (err, data)=>{
        if(err){
            res.status(400).json({status: "failed", data: err})
        }else{
            res.status(200).json({status: "success", data: data}) 
        }
    });
}


// Filter todo
exports.filterTodoByStatus = (req, res)=>{
    let reqBody = req.body
    let username = req.headers.username
    let status = reqBody.todoStatus
    todoModel.find({"username": username, "todoStatus": status}, (err, data)=>{
        if(err){
            res.status(400).json({status: "failed", data: err})
        }else{
            res.status(200).json({status: "success", data: data}) 
        }
    });
}

// filterTodoByDate
exports.filterTodoByDate = (req, res)=>{
    let reqBody = req.body
    let username = req.headers.username
    let FromDate = reqBody.FromDate
    let ToDate = reqBody.ToDate
    todoModel.find({"username": username, "todoCreateDate": {$gte: new Date(FromDate), $lte: new Date(ToDate)}}, (err, data)=>{
        if(err){
            res.status(400).json({status: "failed", data: err})
        }else{
            res.status(200).json({status: "success", data: data}) 
        }
    });
}

