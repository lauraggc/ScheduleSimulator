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
            dataHandler.getUsers(req,res)
        } else {
            for( const [key,value] of query){
                if(key){
                    courses = res.json(dataHandler.getUsers(value));
                }
                
            }
        }
    });

// CREATE
router.route('/')
    .post((req,res)=>{
        console.log("Post")
        dataHandler.createUser(req, res);
    })

// DELETE
router.route('/:userId')
    .delete((req,res)=>{
        dataHandler.deleteUser(req, res)
    })

    // get users by
router.route('/:userId')
    .get((req,res)=>{
        dataHandler.getUserByUserId(req, res)
    });

    //update user by userId
router.route('/:userId')
    .put((req,res)=>{
        dataHandler.updateUser(req, res)
    })


module.exports = router;