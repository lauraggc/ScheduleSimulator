"use strict";

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let privateKey = process.env.TOKEN_KEY;


let mongoDB = 'mongodb+srv://lauraggc:Cuasimodo123@simuladorhorario.aa4jcft.mongodb.net/SH';
let options = {useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(mongoDB, options);

let usersSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    userId:{ // expediente
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    semestre:{
        type: Number,   
        required: true
        
    },
    carrera:{
        type: String,
        required: true
    },
    token:String
});


usersSchema.pre('save', function(next){
    let user = this;
    user.password = bcrypt.hashSync(user.password,10);
    next(); 
})

usersSchema.methods.generateToken = function (password){
    let user = this;
    let payload = {_id: user._id, email: user.email};
    //let options = {expiresIn: 60*60}; 

    if(bcrypt.compareSync(password,user.password)){
        try{ //token de usuario 
            user.token = jwt.sign(payload,privateKey);
            return user.token;
        } catch(err){
            console.log(err);
        }
    }
    
}
let User = mongoose.model('Usuarios', usersSchema);
module.exports = User;