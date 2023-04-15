"use strict";

//const { use } = require("../Server/app/routes/horario");

let scheduleContainer = document.getElementById('materiaContainer');
let courseMContainer = document.getElementById('cursosContainer');

let  horarioTemp = {
    "userId": 733994,
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

//sessionStorage.setItem('horarioTemp', JSON.stringify(horarioTemp));

//console.log(JSON.parse(sessionStorage.getItem('horarioTemp')));

const courseUrl = 'http://localhost:3000/courses';

function materiaToHTML(course) {
    
    return `<tr><td><button onclick="mostrarCursos('${course.courseId}')" >${course.courseId}</button></td></tr>`;
}

function materiaList(courses) {
    scheduleContainer.innerHTML = courses.map(materiaToHTML).join("\n");
}
//Esto muestra curso cuando le da click a la materia
function cursoToHTML(course) {
    let courseTimes;
    let courseDays = [];
    for(let i = 0; i < course.days.length; i++)
    {
        switch(course.days[i]){
            case 0:
                courseDays.push(" Lunes");
                break;
            case 1:
                courseDays.push(" Martes");
                break;
            case 2:
                courseDays.push(" Miércoles");
                break;
            case 3:
                courseDays.push(" Jueves");
                break;
            case 4:
                courseDays.push(" Viernes");
                break;
            case 5:
                courseDays.push(" Sábado");
                break;
        }
    }
    switch(course.times)
    {
        case 0: 
            courseTimes = "7:00 - 9:00";
            break;
        case 1:
            courseTimes = "9:00 - 11:00";
            break;
        case 2:
            courseTimes = "11:00 - 13:00";
            break;
        case 3:
            courseTimes = "13:00 - 15:00";
            break;
        case 4:
            courseTimes = "16:00 - 18:00";
            break;
        case 5:
            courseTimes = "18:00 - 20:00";
            break;
        case 6:
            courseTimes = "20:00 - 22:00";
            break;
    }
    return `
    <tr>
    <td>Hora: ${courseTimes}      Dias: ${courseDays}</td>
    <td>${course.teacher}</td>
    <td>${course.title}</td>
    <td>Presencial</td>
    <td colspan="5" valign="bottom" align="center"> <button  onclick="addCurso('${course.classId}')" class="btnAdd btn-primary " style="background-color: green;" id="btnAgregar">Agregar</button></td>
    </tr>`;
}
function classToHTML(course) {
    return `<p>${course.title} - ${course.classId}</p>`;
}
function classIdToHTML(course) {
    if(course !='0'){
        return `<p>${course}</p>`;
    }else{
        return '';
    }
    
}

function cursosList(courses) {
    courseMContainer.innerHTML = courses.map(cursoToHTML).join("\n");
}

function mostrarCursos2(courseIdUser) {
    loadCourses(courseUrl);
}
let courses2;
loadCourses(courseUrl).then(courses => {
    let arrCourses = [];
    for(let i = 0; i < courses.length; i++)
    {
        let isRepeated = false;
        for(let j = i+1; j < courses.length; j++)
        {
            if(courses[i].courseId == courses[j].courseId) isRepeated = true;
        }
        if(!isRepeated) arrCourses.push(courses[i]); 
        //else console.log(courses[i].courseId)
    }
    courses2 = courses;
    materiaList(arrCourses);
});

let selectedCursos =[];
function mostrarCursos(courseIdUser) {
    
    selectedCursos = [];
    for (const value of courses2.values()) {
        if (value.courseId == courseIdUser) {
            selectedCursos.push(value);
            //courseMContainer.innerHTML = '<h1>FUNCIONA</h1>';
        }
    }
    cursosList(selectedCursos);
    return false;


}

function addToSchedule(course) { // que les pase el userId con autenticación de usuarios
    let userIdlogeado = sessionStorage.getItem('newUser');
    userIdlogeado = JSON.parse(userIdlogeado);
    let url = `http://localhost:3000/schedule/${userIdlogeado.userId}/`+ course.classId;
    addCourseToScheduleA(url, course, course => {
        console.log(course);
        alert(course);
    }, (error)=>console.log(error));
    
}

function addCurso(classId){
    let course = new Object();
    for(let i = 0; i < courses2.length; i++) {
        if(courses2[i].classId == classId)
        {
            course.classId = courses2[i].classId;
            course.courseId = courses2[i].courseId;
            course.title = courses2[i].title;
            course.description = courses2[i].description;
            course.teacher = courses2[i].teacher;
            course.times = courses2[i].times;
            course.days = courses2[i].days;
            course.credits = courses2[i].credits;
        }
    }
    console.log(course)
    addToSchedule(course);
    let i = 0, j = 0;
    //let classId = course.classId;
    for(let a of selectedCursos){
        if(a.classId == classId){
            for(let d in a.days){
            let dayContainer = document.getElementById(String(a.times) + String(a.days[d]));
            console.log(a.times + a.days[d]);
            console.log(a.title + a.classId);
            //horarioTemp.schedule[a.times][a.days[d]] = classId;

            //let h = JSON.parse(sessionStorage.getItem('horarioTemp'));
            //h.schedule[a.times][a.days[d]] = classId;

            dayContainer.innerHTML = classToHTML(a);
            }
        }
    }
    
    return false;
}

let userIdlogeado = sessionStorage.getItem('newUser');
userIdlogeado = JSON.parse(userIdlogeado);
let url = `http://localhost:3000/schedule/${userIdlogeado.userId}/`

loadEachSchedule(url).then(courses => {
    let i =0;
    for(let a of courses.schedule){
        for(let b=0; b<6;b++){
            console.log(a[b]);
            let dayContainer = document.getElementById(String(i) + String(b));
            dayContainer.innerHTML = classIdToHTML(a[b]);
            console.log("i:"+i);
            console.log("b:"+b);
        }
        i++;
        //console.log(a);
    }
    console.log(courses.schedule);
});

//funcion de prueba
function matrizHorario(){
    let userIdlogeado = sessionStorage.getItem('newUser');
    userIdlogeado = JSON.parse(userIdlogeado);
    console.log(userIdlogeado.userId); //nos da el horario del usuario recien registrado
    let horarioTemp = JSON.parse(sessionStorage.getItem('horarioTemp'));
    horarioTemp.userId = userIdlogeado;
    horarioTemp = JSON.stringify(horarioTemp);
    sessionStorage.setItem('horarioTemp',horarioTemp);

}
//matrizHorario();