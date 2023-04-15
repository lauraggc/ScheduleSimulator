"use strict";

const mongoose = require('mongoose');

let mongoDB = 'mongodb+srv://lauraggc:Cuasimodo123@simuladorhorario.aa4jcft.mongodb.net/SH';
let options = {useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(mongoDB, options);

let scheduleSchema = mongoose.Schema({
    userId:{
        type: Number,
        required: true
    },
    courses: {
        type: Array,
        required: true
    }, // clase course
   /* schedule: {
        type: Array.from(Array(7), () => new Array(6)),
        required: true
    }*/
    schedule: [[{type: String}]]
})

scheduleSchema.pre('save', function(next) {//antes de que se haga un save se encripta la contraseña

    let schedule = this;
    let filas = [];
    console.log(schedule.schedule[0]);
    for(let i = 0; i < 6; i++)
    {
        filas[i] = 0;
    }
    for(let j = 0; j < 7; j++)
    {
        schedule.schedule.push(filas);
    }
    
    next();

})

let Schedule = mongoose.model('Horarios', scheduleSchema);

module.exports = Schedule;