"use strict";

function classIdToHTML(course) {
    if(course !='0'){
        return `<p>${course}</p>`;
    }else{
        return '';
    }
    
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
