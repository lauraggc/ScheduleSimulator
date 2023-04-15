"use strict";

process.env.TOKEN_KEY = 'ABC123#'; //necesario para el login

const express = require('express');
const router = require('./app/controllers/router');
const loginRouter = require('./app/routes/login_router');
const solicitud = require('./app/routes/solicitud');

const app = express();
const port = 3000;
const cors = require('cors'); 

app.use(cors());
  //{
  //origin : ['http://127.0.0.1:5500']
//}));
app.use(express.json()); // Use express body-parser to parse all request bodies.
app.use(router);
app.use('/login' ,loginRouter);
app.use('/solicitud',solicitud);

app.listen(port, () => {
 console.log(`Example app listening on port ${port}!`);
})