"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');


router.route('/')
    .get((req, res) => {
        let query = req.query.filter;

        let courses;
        if (query == undefined) {
            dataHandler.getCourse(req,res)
        } else {
            for( const [key,value] of query){
                if(key){
                    courses = res.json(dataHandler.getCourse(value));
                }
                
            }
        }
    });

router.route('/')
    .post((req,res)=>{
        console.log("Post")
        dataHandler.createCourse(req, res);
    })

router.route('/:classId')
    .delete((req,res)=>{
        dataHandler.deleteCourse(req, res)
    })

    // get courses by
router.route('/:classId')
    .get((req,res)=>{
        dataHandler.getCourseByClassId(req, res)
    });

    //update course by classId
router.route('/:classId')
    .put((req,res)=>{
        dataHandler.updateCourse(req, res)
    })

    

module.exports = router;