"use strict"
const express = require('express');
const router = express.Router();
const tokenUtils = require('../controllers/token_utils');

router.use('/post/solicitud',tokenUtils.verifyToken);

module.exports = router;