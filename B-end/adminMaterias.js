"use strict";
let courseContainer = document.getElementById('adminCoursesContainer');
let noResultsContainer = document.getElementById('noResults');
const courseUrl = 'http://localhost:3000/courses';
let classIdForUpdate;
let courseIdForUpdate;
let titleForUpdate;
let descriptionForUpdate;
let teacherForUpdate;
let creditsForUpdate;
let daysForUpdate;
let timesForUpdate;

function createCourse(){
    let classId = document.getElementById('newClassId').value;
    let courseId = document.getElementById('newCourseId').value;
    let title = document.getElementById('newCourseTitle').value;
    let teacher = document.getElementById('newCourseTeacher').value;
    let description = document.getElementById('newCourseDescription').value;
    let credits = document.getElementById('newCourseCredits').value;
    let times = document.getElementById('newCourseTimes').value;
    switch(times){
        case "7:00 - 9:00": times = 0; break;
        case "9:00 - 11:00": times = 1; break;
        case "11:00 - 13:00": times = 2; break;
        case "13:00 - 15:00": times = 3; break; 
        case "16:00 - 18:00": times = 4; break;
        case "18:00 - 20:00": times = 5; break;
        case "20:00 - 22:00": times = 6; break;
    }
    let courseDays = [];
    if(document.getElementById('newCourseDay1').value != "-- Seleccionar") courseDays.push(document.getElementById('newCourseDay1').value)
    if(document.getElementById('newCourseDay2').value != "-- Seleccionar") courseDays.push(document.getElementById('newCourseDay2').value)
    if(document.getElementById('newCourseDay3').value != "-- Seleccionar") courseDays.push(document.getElementById('newCourseDay3').value)

    for(let i = 0; i < courseDays.length; i++) {
        switch(courseDays[i]) {
            case "Lunes": courseDays[i] = 0; break;
            case "Martes": courseDays[i] = 1; break;
            case "Miércoles": courseDays[i] = 2; break;
            case "Jueves": courseDays[i] = 3; break;
            case "Viernes": courseDays[i] = 4; break;
            case "Sábado": courseDays[i] = 5; break;
        }
    }

    let newCourse = new Object();
    newCourse.title = title;
    newCourse.description = description;
    newCourse.teacher = teacher;
    newCourse.classId = classId;
    newCourse.courseId = courseId;
    newCourse.credits = credits;
    newCourse.times = times;
    newCourse.days = courseDays;
    console.log(newCourse.days);
    console.log(newCourse.credits);
    console.log(newCourse.title);

// verify token?
    createCourses('http://localhost:3000/courses', newCourse, course => {
        console.log(course);
    }, (error)=>console.log(error));
}

function courseToHTML(course){
    //let courseDays = []
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
    //console.log(courseTimes)
    return `<div class="card" style="width:90%">
    <h5 class="card-header">${course.title} - ${course.courseId}</h5>
    <div class="card-body">
      <p class="card-text">Profesor: ${course.teacher}</p>
      <p class="card-text">${course.description}</p>
      <p class="card-text">${course.classId}</p>
      <p class="card-text">Créditos: ${course.credits}</p>
      <p class="card-text">Días: ${courseDays}</p>
      <p class="card-text">Horario: ${courseTimes}</p>
      <div class="btns">
        <a class=" btn btn-primary" id="editCourseBtn" data-toggle="modal" data-target="#editCourse" onclick="getClassIdForUpdate('${course.classId}', '${course.courseId}', '${course.title}', '${course.description}', '${course.teacher}', '${course.credits}', '${course.days}', '${course.times}')">Editar</a>
        <a class=" btn btn-primary" style="background-color: rgb(186, 21, 21);" id="deleteCourseBtn" onclick="deleteCourse('${course.classId}')">Eliminar</a>
      </div>
    </div>
  </div>`
}

function getClassIdForUpdate(classId, courseId, title, description, teacher, credits, days, times) {
    classIdForUpdate = classId;
    courseIdForUpdate = courseId;
    titleForUpdate = title;
    descriptionForUpdate = description;
    teacherForUpdate = teacher;
    creditsForUpdate = credits;
    daysForUpdate = days;
    timesForUpdate = times;
    console.log(days)
    //updateCourse(classId)
}

function updateCourse(){
    //let classId = document.getElementById('newClassId').value;
    /*let neWcourseId = document.getElementById('editCourseId').value;
    if(neWcourseId == null) neWcourseId = courseId;*/
    /*let neWtitle = document.getElementById('editCourseTitle').value;
    if(neWtitle == null) neWtitle = titleForUpdate;*/
    let neWteacher = document.getElementById('editCourseTeacher').value;
    console.log(neWteacher);
    console.log(teacherForUpdate);
    if(neWteacher == "") neWteacher = teacherForUpdate;
    let neWdescription = document.getElementById('editCourseDescription').value;
    if(neWdescription == "") neWdescription = descriptionForUpdate;
    let neWcredits = document.getElementById('editCourseCredits').value;
    if(neWcredits == "") neWcredits = creditsForUpdate;
    let neWtimes = document.getElementById('editCourseTimes').value;
    let newCourse = new Object();
    let neWcourseDays = [];
    switch(neWtimes){
        case "7:00 - 9:00": neWtimes = 0; break;
        case "9:00 - 11:00": neWtimes = 1; break;
        case "11:00 - 13:00": neWtimes = 2; break;
        case "13:00 - 15:00": neWtimes = 3; break; 
        case "16:00 - 18:00": neWtimes = 4; break;
        case "18:00 - 20:00": neWtimes = 5; break;
        case "20:00 - 22:00": neWtimes = 6; break;
        default: neWtimes = timesForUpdate;
    }
    let courseDays = [];
    if(document.getElementById('newCourseDay1').value != "-- Seleccionar") courseDays.push(document.getElementById('newCourseDay1').value)
    if(document.getElementById('newCourseDay2').value != "-- Seleccionar") courseDays.push(document.getElementById('newCourseDay2').value)
    if(document.getElementById('newCourseDay3').value != "-- Seleccionar") courseDays.push(document.getElementById('newCourseDay3').value)
    // los días no se suben porque por la forma en la que lo hice no hay foma de cambiarlos sin que se cumpla la propiedad -- Seleccionar
    console.log("courseDays: ", courseDays.length)
    if(courseDays.length === 0){
        newCourse.days = daysForUpdate;
    }
    else {
        for(let i = 0; i < courseDays.length; i++) {
            switch(courseDays[i]) {
                case "Lunes": courseDays[i] = 0; break;
                case "Martes": courseDays[i] = 1; break;
                case "Miércoles": courseDays[i] = 2; break;
                case "Jueves": courseDays[i] = 3; break;
                case "Viernes": courseDays[i] = 4; break;
                case "Sábado": courseDays[i] = 5; break;
            }
        }
        newCourse.days = courseDays;
    }
    console.log(neWcourseDays);
    //neWcourseDays = daysForUpdate;

    //let newCourse = new Object();
    newCourse.classId = classIdForUpdate;
    newCourse.title = titleForUpdate;
    newCourse.description = neWdescription;
    newCourse.teacher = neWteacher;
    newCourse.courseId = courseIdForUpdate;
    newCourse.credits = neWcredits;
    newCourse.times = neWtimes;
    //newCourse.days = neWcourseDays;
    console.log(newCourse.days);
    console.log(newCourse.credits);
    console.log(newCourse.title);

// verify token?
    updateCourses('http://localhost:3000/courses/' + classIdForUpdate, newCourse, course => {
        console.log(course);
    }, (error)=>console.log(error));
}

function deleteCourse(classId){
    let url = 'http://localhost:3000/courses/' + classId;
    console.log(url)
    deleteCourses(url, classId => {
        console.log(classId);
    }, (error)=>console.log(error));
}
function coursesList(courses){
    courseContainer.innerHTML = courses.map(courseToHTML).join("\n") + '\n\n';
}
loadAdminCourses(courseUrl).then(courses =>{
    let c = courses;
    coursesList(c);
});