"use strict";

const router = require('express').Router();
const dataHandler = require('../controllers/data_handler');

router.route('/usuario') //login alumno
    .post((req,res) => dataHandler.login(req,res));

router.route('/profesor') //login profesor
    .post((req,res) => dataHandler.loginProfe(req,res));

module.exports = router;