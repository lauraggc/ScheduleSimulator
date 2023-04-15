"use strict";

const userUrl = 'http://localhost:3000/users/';
//const userUrl = 'http://localhost:3000/users/';
const loginUsuarioUrl = 'http://localhost:3000/login/usuario';
//const scheduleUrl = 'http://localhost:3000/schedule';


let newUser = new Object();
function prueba(){
    window.location.href='/horario.html';
}

function cargarUserData(){
    console.log("formulario registro");
    let nombre = document.getElementById('nombreRegistro').value;
    let expediente =Number(document.getElementById('expediente').value);
    let email = document.getElementById('emailRegistro').value;
    let password = document.getElementById('pass1Registro').value;
    let semestre = 5;
    let carrera = 'ISC';
    newUser.name = nombre;
    newUser.userId = expediente;
    newUser.password = password;
    newUser.email = email;
    newUser.semestre = semestre;
    newUser.carrera = carrera;
    
    console.log(newUser);
    
    sessionStorage.setItem('newUser',JSON.stringify(newUser));    

    //Creamos el usuario
    createUsers(userUrl,newUser,user=>{
        console.log(JSON.stringify(newUser));
    },(error)=>console.log(error));

    let scheduleUrl = `http://localhost:3000/schedule/${newUser.userId}`;
    let  newSchedule = {
        "userId": newUser.userId,
        "courses": [],
        "schedule": [
            [
                "0",
                "0",
                "0",
                "0",
                "0",
                "0"
            ],
            [
                "0",
                "0",
                "0",
                "0",
                "0",
                "0"
            ],
            [
                "0",
                "0",
                "0",
                "0",
                "0",
                "0"
            ],
            [
                "0",
                "0",
                "0",
                "0",
                "0",
                "0"
            ],
            [
                "0",
                "0",
                "0",
                "0",
                "0",
                "0"
            ],
            [
                "0",
                "0",
                "0",
                "0",
                "0",
                "0"
            ],
            [
                "0",
                "0",
                "0",
                "0",
                "0",
                "0"
            ]
        ]
    };



    //creamos su respectivo usuario
    createSchedules(scheduleUrl,newSchedule,shedule=>{
        console.log(JSON.stringify(newSchedule));
    },(error)=>console.log(error));

    //se hace login para generar token
    let loginNewUser = new Object();
    loginNewUser.email = newUser.email;
    loginNewUser.password = newUser.password;

    loadLoginUser(loginUsuarioUrl,loginNewUser,login =>{
        console.log("loadloginUser en cargaruserdata"+login);
        sessionStorage.setItem('loginUser',login);
        window.location.href='/horario.html';
    },(error)=>console.log(error));

}

function loginUsuario(){
    let loginEmail = document.getElementById('emailLogin').value;
    let loginPassword = document.getElementById('passLogin').value;
    let newLogin = new Object();
    newLogin.email = loginEmail;
    newLogin.password = loginPassword;
    console.log(JSON.stringify(newLogin));

    loadLoginUser(loginUsuarioUrl,newLogin,login =>{
        console.log("loadloginUser en loginUsuario"+login);
        sessionStorage.setItem('loginUser',login);
        window.location.href='/horario.html';
    },(error)=>{
        console.log(error);
        alert("Contraseña o email incorrecto");
    });

}
