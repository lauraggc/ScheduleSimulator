"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('../controllers/data_handler');

router.route('/')
    .get((req,res)=> {
        dataHandler.getSchedule(req,res);
    })

router.route('/:userId')
    .get((req,res)=>{
        dataHandler.getScheduleByUserId(req, res)
    })

router.route('/:userId')
    .post((req,res)=> {
        dataHandler.createSchedule(req,res);
    })

router.route('/:userId')
    .put((req,res)=>{
        dataHandler.deleteCourseByClassId(req, res)
    })

router.route('/:userId/:classId')
    .put((req,res)=>{   
        dataHandler.addCourseByClassId(req, res)
    })



module.exports = router;