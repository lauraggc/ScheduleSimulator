"use strict";

async function loadCourses(url) {
    // fetch from localhost:3000/api/courses
    let response = await fetch(url);
    if(response.status != 200)return [];
    return await response.json();
}

async function loadAdminCourses(url) {
    let response = await fetch(url);
    if(response.status != 200)return [];
    return await response.json();
}
async function loadEachSchedule(url){
    let response = await fetch(url);
    if(response.status != 200)return [];
    return await response.json();
}

function createCourses(url, newCourse, onSuccess, onError){
    let xhr = new XMLHttpRequest(); //Hace el request
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(newCourse));
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
}

function createUsers(url, newUser, onSuccess, onError){
    let xhr = new XMLHttpRequest(); //Hace el request
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(newUser));
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
}
function createSchedules(url,newSchedule,onSuccess,onError){
    let xhr = new XMLHttpRequest(); //Hace el request
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(newSchedule));
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
}

//POST DEL LOGIN DE USUARIO
function loadLoginUser(url,login,onSuccess,onError){
    let xhr = new XMLHttpRequest(); //Hace el request
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(login));
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
}

function updateCourses(url, newCourse, onSuccess, onError){
    let xhr = new XMLHttpRequest(); //Hace el request
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(newCourse));
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
}

function updateUsers(url, newUser, onSuccess, onError){
    let xhr = new XMLHttpRequest(); //Hace el request
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(newUser));
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
}



function addCourseToScheduleA(url, course, onSuccess, onError){
    let xhr = new XMLHttpRequest(); //Hace el request
    xhr.open('PUT', url);   
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(course));
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
}

function loadHorarioCourses(url, coursesList, onSuccess, onError){
    let xhr= new XMLHttpRequest();

    xhr.open('POST', url);
    xhr.send(JSON.stringify(coursesList));
    xhr.onload = ()=>getXhrResponse(xhr, onSuccess, onError);
}

function getXhrResponse(xhr, onSuccess, onError) {
    if (xhr.status == 200) {
        onSuccess(xhr.responseText);
    } else {
        onError(xhr.status + ': ' + xhr.statusText);
    }
}

function deleteCourses(url, onSuccess, onError){
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);
    xhr.send(null);
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
}

function deleteUsers(url, onSuccess, onError){
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);
    xhr.send(null);
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
}