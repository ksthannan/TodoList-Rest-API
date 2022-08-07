// import mongoose 
const mongoose = require('mongoose');

// Schema for todo list data
const DataSchema = mongoose.Schema({
    username:{
        type: String
    },
    todoSubject:String,
    todoDescription:String,
    todoStatus:{
        type:String,
        default: "New"
    },
    todoCreateDate: {
        type: Date,
        default: Date.now
    },
    todoUpdateDate: {
        type: Date,
        default: Date.now
    }
    
},{versionKey:false});
const todoModel = mongoose.model('todo', DataSchema);

// module exports 
module.exports = todoModel;