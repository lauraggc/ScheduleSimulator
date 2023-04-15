"use strict";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
let mongoDB = 'mongodb+srv://lauraggc:Cuasimodo123@simuladorhorario.aa4jcft.mongodb.net/SH';
let options = {useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(mongoDB, options);

let adminSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    token:String
})

let Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;