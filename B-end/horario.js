"use strict";

class SchedulingException{
    constructor(errorMessage){
        this.errorMessage = errorMessage;
    }
}
class CourseProxy{
    constructor(courseId, classId){ // courseId = clave de la asignatura en general. classId = clave de un salón en específico
        this.courseId = courseId;
        this.classId = classId;
    }
}

class Schedule{
    constructor(userId){
        this.courses=[]; // clase course
        this.courseProxies = []; // courseId, clasId
        this.userId = userId;
        this.schedule =  Array.from(Array(7), () => new Array(6));
    }

    get courses(){      
        return this._courses;
    }
    get schedule(){
        return this._schedule;
    }
    get userId(){
        return this._userId;
    }
    set userId(value){
        if(!Number.isInteger(value)){
            throw new SchedulingException("userId must be a number");
        }else if(value < 0){
            throw new SchedulingException("userId must be positive");
        }
        this._userId = value;
    }
    set schedule(value){
        if(typeof value != null){
            for(let i = 0; i < value.length; i++){
                for(let j = 0; j < value[i].length; j++)
                {
                    value[i][j] = null;
                }
            }
            this._schedule = value;
        } else{
            throw new SchedulingException("schedule matrix cannot be null");
        }
    }
    
    set courses(value){
        this._courses = [];
        if (typeof value=='string'){
            value = JSON.parse(value);
            this._courses.push(Course.createFromObject(value)); // cambiar el nombre de la clase course y de la función
        }
        if(Array.isArray(value)){
            for(let i=0;i<value.length;i++){
                
                this._courses.push(Course.createFromObject(value[i])); // cambiar el nombre de la clase course y de la función
            }
        }
        else{
            
            this._courses.push(Course.createFromObject(value)); // cambiar el nombre de la clase course y de la función
        }
    }
    addCourse(classId, course){
        if (classId == null){
            throw new SchedulingException("classId is null");
        }
        if (course == null){
            throw new SchedulingException("nonexistent course");
        }
        let courseIdd = course._courseId;
        let courseIdIndex = this.courseProxies.findIndex((CourseProxy) => CourseProxy.courseId == courseIdd);

        if(courseIdIndex == -1){    
            let courseIndex = this.courseProxies.findIndex((CourseProxy) => CourseProxy.classId==classId);
            if (courseIndex != -1){ 
                throw new SchedulingException("Esta materia ya se encuentra en tu horario");// si es -1 es que no existe el curso en this.courses // si no es -1 ya existe el curso en this.courses
            }else{
                this.courses.push(course);
                let courseProxy = new CourseProxy(course._courseId, classId);
                this.courseProxies.push(courseProxy);
                courseIndex = this.courseProxies.findIndex((CourseProxy) => CourseProxy.classId==classId);
                //console.log("h")
                let courseDays = getDays(course._days);
                let count = 0;
                for(let i = 0; i < courseDays.length; i++){
                    if(this.schedule[course._times][courseDays[i]] != null) count++;
                }
                if(count == 0)
                {
                    for(let i = 0; i < courseDays.length; i++){
                        this.schedule[course._times][courseDays[i]] = classId;
                    }
                    //this.courses.push(course);
                } else {
                    this.removeCourse(classId);
                    throw new SchedulingException("Horario ocupado, no se puede meter este curso");
                }
            }
        }else{
            throw new SchedulingException("Ya agregaste esta materia con este u otro profesor");
        }
    }

    removeCourse(classId){
        console.log(this.courseProxies);
        const courseIndex = this.courseProxies.findIndex((CourseProxy) => CourseProxy.classId == classId);
        if (courseIndex != -1){
            console.log(this.courses)
            let courseDays = getDays(this.courses[courseIndex]._days);
            for(let i = 0; i < courseDays.length; i++){
                let a = null;
                this.schedule[this.courses[courseIndex]._times][courseDays[i]] = null;
            }
            this.courseProxies.splice(courseIndex, 1);
            this.courses.splice(courseIndex, 1);
        }else{
            throw new SchedulingException("Can't remove a nonexisting course proxy");
        }
    }
}

function getDays(days){ // suponiendo que los días en la clase course son una lista de strings
    let courseDays = [];
    for(let i = 0; i < days.length; i++){
        switch(days[i]){
            case "Lunes": 
                courseDays.push(0); 
                break;
            case "Martes": 
                courseDays.push(1);
                break;
            case "Miércoles": 
                courseDays.push(2);
                break;
            case "Jueves": 
                courseDays.push(3);
                break;
            case "Viernes": 
                courseDays.push(4);
                break;
            case "Sábado": 
                courseDays.push(5);
                break;
        }
    }
    return courseDays;
}