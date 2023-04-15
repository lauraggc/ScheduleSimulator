"use strict";

//const { ObjectId } = require("mongodb");
const mongoose = require('mongoose');
//const { getCourseByClassId } = require("../controllers/data_handler");
let mongoDB = 'mongodb+srv://lauraggc:Cuasimodo123@simuladorhorario.aa4jcft.mongodb.net/SH';
let options = {useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(mongoDB, options);

let courseSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    teacher:{
        type: String,
        required: true
    },
    classId:{
        type: String,   
        required: true
        
    },
    courseId:{
        type: String,
        required: true
    },
    times:{
        type: Number,
        required: true
    },
    days:{
        type: Array,
        required: true
    },
    credits:{
        type: Number,
        required: true
    }
})

let Course = mongoose.model('Clases', courseSchema);
module.exports = Course;