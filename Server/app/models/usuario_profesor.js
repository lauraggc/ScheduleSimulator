"use strict";

const mongoose = require('mongoose');
let mongoDB = 'mongodb+srv://lauraggc:Cuasimodo123@simuladorhorario.aa4jcft.mongodb.net/SH';
let options = {useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(mongoDB, options);

let teachersSchema = mongoose.Schema({
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
    departamento:{
        type: String,   
        required: true
        
    },token:String
})

let Teacher = mongoose.model('Profesor', teachersSchema);
module.exports = Teacher;