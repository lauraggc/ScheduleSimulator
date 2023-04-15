"use strict";

class CourseException {
    constructor(errorMessage) {
        this.errorMessage  = errorMessage;
    }
}

class Course{
    constructor(title, description, teacher, classId, courseId, times, days, credits) {
        this.title = title;
        this.description = description,
        this.teacher = teacher,
        this.classId = classId,
        this.courseId = courseId,
        this.times = times,
        this.days = days,
        this.credits = credits;
    }

    get title(){
        this._title;
    }

    set title(value){
        if(typeof value != 'string' || value ===''){
            throw new CourseException("Title cannot be empty, and only string")
        }
        this._title = value;
    }
    get description(){
        this._description;
    }

    set description(value){
        if(typeof value != 'string' || value ===''){
            throw new CourseException("Description cannot be empty, and only string")
        }
        this._description = value;
    }
    get teacher(){
        this._teacher;
    }

    set teacher(value){
        if(typeof value != 'string' || value ===''){
            throw new CourseException("Teacher title cannot be empty, and only string")
        }
        this._teacher = value;
    }
    get classId(){
        this._classId;
    }

    set classId(value){
        if(typeof value != 'string' || value ===''){
            throw new CourseException("ClassId title cannot be empty, and only string")
        }
        this._classId = value;
    }
    get times(){
        this._times;
    }

    set times(value){
        if(typeof value != 'number' || value ===''){
            throw new CourseException("the class time cannot be empty, and only string")
        }
        this._times = value;
    }
    get days(){
        this._days;
    }

    set days(value){
        if(typeof value == null || value ===''){
            throw new CourseException("Days cannot be empty, and only string")
        }
        this._days = value;
    }

    get credits(){
        this._credits;
    }

    set credits(value){
        if(typeof value != 'number' || value ===''){
            throw new CourseException("Credits title cannot be empty, and only string")
        }
        this._credits = value;
    }
    get courseId(){
        this._courseId;
    }

    set courseId(value){
        if(typeof value != 'string' || value ===''){
            throw new CourseException("courseId title cannot be empty, and only string")
        }
        this._courseId = value;
    }

    static createFromJSON(jsonValue){
        let obj =JSON.parse(jsonValue);
        return Course.createFromObject(obj);
    }
    static createFromObject(obj){
        let newClass={};
        Object.assign(newClass, obj); //Clona al original, pero tbm maneja valores no-obj.
        Course.cleanObject(newClass);
        console.log(obj)
        //Pasar newProduct a Product instance.
        //let product= new Prodcut(newProduct,title...);
        let clase= new Course(newClass._title, newClass._description, newClass._teacher, newClass._classId, newClass._courseId,  newClass._times, newClass._days, newClass._credits);
        return clase;
    }
    static cleanObject(obj){
        //Verificar que sólo tenga las propiedades deseadas
        let properties=['title', 'description', 'teacher', 'idClase', 'schedule', 'days', 'credits'];
        for(let prop in obj){
            //if prop in properties continua, else delete
            if(!properties.includes(prop)){
                delete obj.prop;
            }
        }
    }

}