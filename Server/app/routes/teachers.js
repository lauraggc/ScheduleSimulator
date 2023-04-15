"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');
// GET
router.route('/')
    .get((req, res) => {
        let query = req.query.filter;

        let courses;
        if (query == undefined) {
            dataHandler.getTeachers(req,res)
        } else {
            for( const [key,value] of query){
                if(key){
                    courses = res.json(dataHandler.getTeachers(value));
                }
                
            }
        }
    });
// CREATE
router.route('/')
    .post((req,res)=>{
        console.log("Post")
        dataHandler.createTeacher(req, res);
    })

// DELETE
router.route('/:userId')
    .delete((req,res)=>{
        dataHandler.deleteTeacher(req, res)
    })
    // get users by
router.route('/:userId')
    .get((req,res)=>{
        dataHandler.getTeacherByUserId(req, res)
    });
    //UPDATE
router.route('/:userId')
    .put((req,res)=>{
        dataHandler.updateTeacher(req, res)
    })

module.exports = router;