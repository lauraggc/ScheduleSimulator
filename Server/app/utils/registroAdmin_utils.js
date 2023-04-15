"use strict";

const userUrl = 'http://localhost:3000/users/';
//const adminUrl = 'http://localhost:3000/profes/'; //ruta to
const loginUsuarioUrl = 'http://localhost:3000/login/usuario';
//const loginAdminUrl = 'http://localhost:3000/login/profesor';

//const scheduleUrl = 'http://localhost:3000/schedule';


let newProfe = new Object();

function prueba(){
    window.location.href='/horario.html';
}
//Activado al presionar registrarse en el modal
function cargarAdminData(){
    console.log("formulario registro Admin");
    let nombre = document.getElementById('nombreRegistroProfe').value;
    let expediente =Number(document.getElementById('expedienteProfe').value);
    let email = document.getElementById('emailRegistroProfe').value;
    let password = document.getElementById('pass1RegistroProfe').value;
    let semestre = 0;
    let carrera = 'ADMIN';
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


    //se hace login para generar token
    let loginNewUser = new Object();
    loginNewUser.email = newUser.email;
    loginNewUser.password = newUser.password;

    loadLoginUser(loginUsuarioUrl,loginNewUser,login =>{
        console.log("loadloginUser en cargaruserdata"+login);
        sessionStorage.setItem('loginUser',login);
        window.location.href='/adminMaterias.html';
    },(error)=>console.log(error));

}

function loginAdmin(){
    let loginEmail = document.getElementById('emailLoginAdmin').value;
    let loginPassword = document.getElementById('passLoginAdmin').value;
    let newLogin = new Object();
    newLogin.email = loginEmail;
    newLogin.password = loginPassword;
    console.log(JSON.stringify(newLogin));

    loadLoginUser(loginUsuarioUrl,newLogin,login =>{
        console.log("loadloginUser en loginAdmin"+login);
        sessionStorage.setItem('loginUser',login);
        window.location.href='/adminMateriasAdmin.html';
    },(error)=>{
        console.log(error);
        alert("Contraseñ    a o email incorrecto");
    });

}
