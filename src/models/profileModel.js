// import mongoose 
const mongoose = require('mongoose');

// Schema for user profile registration data 
const DataSchema = mongoose.Schema({
    username:{
        type: String,
        unique: true
    },
    password:String,
    email: {
        type: String,
        unique: true,
        validator: function(v) {
            return /\S+@\S+\.\S+/
            .test(v);
        },
        message: props => `${props.value} is not a valid email address!`,
        required: [true, 'User email address required']
    },
    firstName: String,
    lastName: String,
    mobile: {
        type: String,
        validate: {
        validator: function(v) {
            return /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/
            .test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    },
    address: String,
    city: String,
    state: String,
    country: String,
    interest: String

    
},{versionKey:false});
const userProfileModel = mongoose.model('users', DataSchema);

// module exports 
module.exports = userProfileModel;