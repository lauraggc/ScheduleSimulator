"use strict";
let courseContainer = document.getElementById('adminCoursesContainer');
let noResultsContainer = document.getElementById('noResults');
const userUrl = 'http://localhost:3000/users';
let nameForUpdate;
let userIdForUpdate;
let passwordForUpdate;
let emailForUpdate;
let semestreForUpdate;
let carreraForUpdate;

function showData(){

}

if(window.location.pathname == './adminUsuarios.html'){
    document.addEventListener('DOMContentLoaded', (event) => {
        showData();
        sessionStorage.wbool = "true";
    });
};

function createUser(){
    let name = document.getElementById('newUserName').value;
    let userId = document.getElementById('newUserId').value;
    let password = document.getElementById('newUserPassword').value;
    let email = document.getElementById('newUserEmail').value;
    let semestre = document.getElementById('newUserSemester').value;
    let carrera = document.getElementById('newUserCareer').value;

    let newUser = new Object();
    newUser.name = name;
    newUser.userId = userId;
    newUser.password = password;
    newUser.email = email;
    newUser.semestre = semestre;
    newUser.carrera = carrera;
    console.log(newUser.name);
    console.log(newUser.userId);
    console.log(newUser.email);

// verify token?
    createUsers('http://localhost:3000/users', newUser, user => {
        console.log(user);
    }, (error)=>console.log(error));

    showData();
}

function userToHTML(user){
    return `<div class="card" style="width:90%">
    <h5 class="card-header">${user.name} - ${user.userId}</h5>
    <div class="card-body">
      <p class="card-text">Email: ${user.email}</p>
      <p class="card-text">Password: ${user.password}</p>
      <p class="card-text">Semestre: ${user.semestre}</p>
      <p class="card-text">Carrera: ${user.carrera}</p>
      <div class="btns">
        <a class=" btn btn-primary" id="editCourseBtn" data-toggle="modal" data-target="#editUser" onclick="getUserIdForUpdate('${user.name}', '${user.userId}', '${user.email}', '${user.password}', '${user.semestre}', '${user.carrera}')">Editar</a>
        <a class=" btn btn-primary" style="background-color: rgb(186, 21, 21);" id="deleteuserBtn" onclick="deleteUser('${user.userId}')">Eliminar</a>
      </div>
    </div>
  </div>`
}

function getUserIdForUpdate(name, userId, email, password, semestre, carrera) {
    nameForUpdate = name;
    userIdForUpdate = userId;
    emailForUpdate = email;
    passwordForUpdate = password;
    semestreForUpdate = semestre;
    carreraForUpdate = carrera;
    console.log("get params")
    //updateCourse(classId)
}

function updateUser(){
    let name = document.getElementById('editName').value;
    if(name == "") name = nameForUpdate;
    let email = document.getElementById('editEmail').value;
    if(email == "") email = emailForUpdate;
    let password = document.getElementById('editPassword').value;
    if(password == "") password = passwordForUpdate;
    let semestre = document.getElementById('editSemestre').value;
    if(semestre == "") semestre = semestreForUpdate;
    let carrera = document.getElementById('editCarrera').value;
    if(carrera == "") carrera = carreraForUpdate;
    
    let newUser = new Object();
    newUser.userId = userIdForUpdate
    newUser.name = name;
    newUser.email = email;
    newUser.password = password;
    newUser.semestre = semestre;
    newUser.carrera = carrera;
    console.log(newUser.name);
    console.log(newUser.userId);
    console.log(newUser.carrera);
    
    
// verify token?
    updateUsers('http://localhost:3000/users/' + userIdForUpdate, newUser, user => {
        console.log(user);
    }, (error)=>console.log(error));

    showData();
}

function deleteUser(userId){
    let url = 'http://localhost:3000/users/' + userId;
    console.log(url)
    deleteUsers(url, userId => {
        console.log(userId);
    }, (error)=>console.log(error));
    showData();
}
function usersList(users){
    adminUsersContainer.innerHTML = users.map(userToHTML).join("\n") + '\n\n';
}
loadAdminCourses(userUrl).then(user =>{
    let c = user;
    usersList(c);
});