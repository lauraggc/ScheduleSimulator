"use strict";


let courseContainer = document.getElementById('courseContainer');
let noResultsContainer = document.getElementById('noResults');
let courseContainer2 = document.getElementById('courseEachContainer');
const courseUrl = 'http://localhost:3000/courses/';
let días=['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
let horas=['7:00 - 9:00','9:00 - 11:00','11:00 - 1:00','1:00 - 3:00','4:00 - 6:00','6:00 - 8:00'];


function courseToHTML(course){
    return `<a class="btnCourse" onclick="printCourses('${course.classId}')">${course.title} - ${course.teacher}</a><br><hr>`
}
function coursesList(courses){
    courseContainer.innerHTML = '<hr>' + courses.map(courseToHTML).join("\n") + '\n<hr>';
}

function courseToHTML2(course){
    if(course.days[1]==undefined){
        return `<h1 id="info-header">    ${course.title}</h1>
                <p id="info-text">     Horario:  ${horas[course.times]}</p>
                <p id="info-text">     Días: ${días[course.days[0]]}</p>
                <p id="info-text">     Profesor: ${course.teacher}</p>
                <p id="info-text">     Créditos: ${course.credits}</p>
                <p id="info-text">     Descripción del curso: ${course.description}</p>
                `
    }
    else if(course.days[2]==undefined){
        return `<h1 id="info-header">    ${course.title}</h1>
                <p id="info-text">     Horario:  ${horas[course.times]}.</p>
                <p id="info-text">     Días: ${días[course.days[0]]} y ${días[course.days[1]]}</p>
                <p id="info-text">     Profesor: ${course.teacher}</p>
                <p id="info-text">     Créditos: ${course.credits}</p>
                <p id="info-text">     Descripción del curso: ${course.description}</p>
                `
    }else{
        return `<h1 id="info-header">    ${course.title}</h1>
                <p id="info-text">     Horario:  ${horas[course.times]}</p>
                <p id="info-text">     Días: ${días[course.days[0]]}, ${días[course.days[1]]} y ${días[course.days[2]]}</p>
                <p id="info-text">     Profesor: ${course.teacher}</p>
                <p id="info-text">     Créditos: ${course.credits}</p>
                <p id="info-text">     Descripción del curso: ${course.description}</p>
                `
    }
}

function printCourses(classId){
    for(const value of eachCourse.values()){
        if(value.classId==classId){
            courseContainer2.innerHTML = courseToHTML2(value);

        }
    }
    return false;
    /*loadCourses(courseUrl).then(course =>{
        courseContainer2.innerHTML = courseToHTML2(course);  
    }); */ 
}

let eachCourse;
loadCourses(courseUrl).then(courses =>{
    /*for(let a of courses){
        console.log(a);
    }*/
    
    
    let c = courses;
    eachCourse=courses;
    coursesList(c);
});