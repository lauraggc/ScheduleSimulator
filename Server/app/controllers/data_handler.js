"use strict";

//Schemas 
const Schedules = require('../models/horarioo.js');
const Courses = require('../models/clases.js');
const Users = require('../models/usuario_alumno.js');
const Teachers = require('../models/usuario_profesor.js');
const Admin = require('../models/usuario_admin.js');


//Jwt login usuario Alumno
function login(req,res){
    //credenciales obtenidas por el body el usuario alumno
    let email = req.body.email;
    let password = req.body.password;

    Users.findOne({email : `${email}`})
        .then( user => {
            console.log(user)
            let userLoginA = new Object();
            let token = user.generateToken(password);
            //console.log(token);
            if(token != undefined){
                res.status(200)
                res.set('Content-Type', 'text/plain; charset=utf-8');
                Users.findOneAndUpdate({email : `${email}`},user,{new : true}).then();
                userLoginA.token = token;
                userLoginA.id = `${user._id}`;
                res.send(userLoginA);
            } else{
                res.status(403)
                res.set('Content-Type', 'text/plain; charset=utf-8');
                res.send('Wrong email or password');
            }
        })
        .catch(err =>{
            res.status(403)
            res.set('Content-Type', 'text/plain; charset=utf-8');
            res.send('Wrong email or password');
        });
}
//Jwt login usuario Profesor
function loginProfe(req,res){
    //credenciales obtenidas por el body el usuario alumno
    let email = req.body.email;
    let password = req.body.password;

    Teachers.findOne({email : `${email}`})
        .then( user => {
            console.log(user)
            let userLoginA = new Object();
            let token = user.generateToken(password);
            //console.log(token);
            if(token != undefined){
                res.status(200)
                res.set('Content-Type', 'text/plain; charset=utf-8');
                Teachers.findOneAndUpdate({email : `${email}`},user,{new : true}).then();
                userLoginA.token = token;
                userLoginA.id = `${user._id}`;
                res.send(userLoginA);
            } else{
                res.status(403)
                res.set('Content-Type', 'text/plain; charset=utf-8');
                res.send('Wrong email or password');
            }
        })
        .catch(err =>{
            res.status(403)
            res.set('Content-Type', 'text/plain; charset=utf-8');
            res.send('Wrong email or password');
        });
}


//Get array
function getCourse(req,res){
    Courses.find({})
        .then(courses => res.status(200).json(courses))
        .catch(err => res.status(400).send(err))
}
function getSchedule(req,res){
    Schedules.find({})
        .then(schedules => res.status(200).json(schedules))
        .catch(err => res.status(400).send(err))
}
function getUsers(req, res){
    Users.find({})
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).send(err))
}
function getTeachers(req, res){
    Teachers.find({})
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).send(err))
}

//Get by id 
function getScheduleByUserId(req, res) {
    let userId = req.params.userId;
    Schedules.findOne({ userId: `${userId}` }).then(schedule => res.status(200).json(schedule));
}
function getCourseByClassId(req, res) {
    //console.log("classId")
    let classId = req.params.classId;
    Courses.findOne({ classId: `${classId}` }).then(course => res.status(200).json(course));
}

function getUserByUserId(req, res) {

}
function getTeacherByUserId(req, res) {

}
//Get courses para búsqueda
function getCoursesByCourseId(req, res) {
    //console.log("h")
    let courseId = req.params.courseId;
    //console.log(req.params.courseId)
    Courses.find({ courseId: `${courseId}` }).then(courses => res.status(200).json(courses));
}

//Create
function createSchedule(req,res){
    let schedule= Schedules(req.params);
    
    schedule.save()
        .then((schedule)=>{
            res.set('Content-Type', 'text/plain; charset=utf-8');
            res.status(201).send(`Se creó el horario ${schedule.userId} `);
        })
        .catch(err=> res.status(400).send(err));
}

function createCourse(req, res){
    let newCourse = Courses(req.body);
    console.log("data_handler: ", req.body);
    newCourse.save()
        .then((course) => {
            res.set('Content-Type', 'text/plain; charset=utf-8');
            res.status(201).send(`Se creó la asignatura ${course.title} `);
        })
}

function createUser(req, res){
    let newUser = Users(req.body);
    console.log("data_handler: ", req.body);
    newUser.save()
        .then((user) => {
            res.set('Content-Type', 'text/plain; charset=utf-8');
            res.status(201).send(`Se creó el usuario ${user.name} `);
        })
}
function createTeacher(req, res){
    let newUser = Teachers(req.body);
    console.log("data_handler: ", req.body);
    newUser.save()
        .then((user) => {
            res.set('Content-Type', 'text/plain; charset=utf-8');
            res.status(201).send(`Se creó el usuario ${user.name} `);
        })
}

//Update    
function updateSchedule(req, res) {
    let userId = req.params.userId;
    let updatedSchedule = req.body;
    for (let property in updatedSchedule) {
        if (['courses', 'userId', 'schedule'].includes(property)) continue;
        delete updatedSchedule[property];
    }
        Schedules.findOneAndUpdate({ userId: `${userId}` }, updatedSchedule, { new : true }).then(schedule => {
        res.type('text/plain; charset=utf-8');
        res.send(`Horario ${schedule.userId} actualizado`);
    });
}

function updateCourse(req, res) {
    let classId = req.params.classId;
    let newCourse = req.body;
   
    Courses.findOneAndUpdate({ classId: `${classId}` }, newCourse, { new : true }).then(sc => {
        res.type('text/plain; charset=utf-8');
        res.send(`Asignatura ${sc.classId} fue actualizada`);
    });
}

function updateUser(req, res) {
    let userId = req.params.userId;
    let newUser = req.body;
   
    Users.findOneAndUpdate({ userId: `${userId}` }, newUser, { new : true }).then(sc => {
        res.type('text/plain; charset=utf-8');
        res.send(`Usuario ${sc.userId} fue actualizado`);
    });
}
function updateTeacher(req, res) {
    let userId = req.params.userId;
    let newUser = req.body;
   
    Teachers.findOneAndUpdate({ userId: `${userId}` }, newUser, { new : true }).then(sc => {
        res.type('text/plain; charset=utf-8');
        res.send(`Usuario ${sc.userId} fue actualizado`);
    });
}

function getUserByUserId(req, res) {
    let userId = req.params.userId;
    let n = req.body;
   
    Courses.findOneAndUpdate({ userId: `${userId}` }, newUser, { new : true }).then(sc => {
        res.type('text/plain; charset=utf-8');
        res.send(`Usuario ${sc.userId} fue actualizado`);
    });
}

// add course
function addCourseByClassId(req, res) {
    let classId = req.params.classId;
    let userId = req.params.userId;
    let course = req.body;
    let times = course.times;
    let days = course.days;
   
    Schedules.findOne({ userId: `${userId}` }).then(sc => 
        {
            let newSchedule = new Object();
            newSchedule.userId = userId;
            newSchedule.courses = sc.courses; // array de los classId
            newSchedule.schedule = sc.schedule; // matriz de posiciones
           
            console.log(userId);
            //console.log(days.length);
            //console.log("new: ", newSchedule.schedule[0]);
            //console.log(sc.schedule[0][0]);
            // hacer los fors para checar si ya está ocupado el lugar
            let count = 0;
            for(let i = 0; i < days.length; i++)
            {
                if(sc.schedule[times][days[i]] != 0) count++;
            }
            if(count == 0)
            {
                newSchedule.courses.push(classId);
                for(let i = 0; i < days.length; i++)
                {
                    sc.schedule[times][days[i]] = classId;
                }
            }else{
                res.send(`No se puede ingresar el curso ${classId}. Elimina el curso que interfiere para agregar este.`);
            }

            console.log(sc);
            console.log(newSchedule);
            Schedules.findOneAndUpdate({ userId: `${userId}` }, newSchedule, { new : true }).then(sc => {
                res.type('text/plain; charset=utf-8');
                res.send(`Horario de ${sc.userId} fue actualizado`);
            });
        }
    );
}

//Delete
function deleteSchedule(req, res) {
    let userId = req.params.userId;
    Schedules.findOneAndDelete({ userId: `${userId}` }).then(schedule => {
        res.type('text/plain; charset=utf-8');
        res.send(userId != undefined ? `Horario ${schedule.userId} eliminado` : `No hay horario con el userId ${userId}`);
    });
}

function deleteCourse(req, res) {
    let classId = req.params.classId;
    console.log(classId)
    Courses.findOneAndDelete({ classId: `${classId}` }).then(course => {
        console.log(classId)
        res.type('text/plain; charset=utf-8');
        res.send(classId != undefined ? `Asignatura ${course.classId} eliminado` : `No hay asignatura con el classId ${classId}`);
    });
}

function deleteUser(req, res) {
    let userId = req.params.userId;
    console.log(userId)
    Users.findOneAndDelete({ userId: `${userId}` }).then(course => {
        console.log(userId)
        res.type('text/plain; charset=utf-8');
        res.send(userId != undefined ? `Usuario ${course.name} eliminado` : `No hay usuario con el userId ${userId}`);
    });
}
function deleteTeacher(req, res) {
    let userId = req.params.userId;
    console.log(userId)
    Teachers.findOneAndDelete({ userId: `${userId}` }).then(course => {
        console.log(userId)
        res.type('text/plain; charset=utf-8');
        res.send(userId != undefined ? `Usuario ${course.name} eliminado` : `No hay usuario con el userId ${userId}`);
    });
}

function deleteCourseByClassId(req, res) {
    let userId = req.params.userId;
    let course = req.body;
    let classId = course.classId;
    let times = course.times;
    let days = course.days;
   
    Schedules.findOne({ userId: `${userId}` }).then(sc => 
        {
            let newSchedule = new Object();
            newSchedule.userId = userId;
            newSchedule.courses = sc.courses; // array de los classId
            newSchedule.schedule = sc.schedule; // matriz de posiciones
           
            console.log(newSchedule);
            //console.log(newSchedule.courses);
            for(let i = 0; i < newSchedule.courses.length; i++)
            {
                if(newSchedule.courses[i] == classId)
                {
                    newSchedule.courses.splice(i, 1);
                }
            }
            //console.log(newSchedule.courses);
            //console.log(newSchedule);
            for(let i = 0; i < days.length; i++)
            {
                if(newSchedule.schedule[times][days[i]] == classId)
                {
                    newSchedule.schedule[times][days[i]] = 0;
                }
            }
            console.log(newSchedule);
            Schedules.findOneAndUpdate({ userId: `${userId}` }, newSchedule, { new : true }).then(sc => {
                res.type('text/plain; charset=utf-8');
                res.send(`Horario de ${sc.userId} fue actualizado`);
            });
        }
    );
}

exports.loginProfe = loginProfe;
exports.getTeacherByUserId = getTeacherByUserId;
exports.deleteTeacher = deleteTeacher;
exports.updateTeacher = updateTeacher;
exports.createTeacher = createTeacher;
exports.getTeachers = getTeachers;
exports.login = login;
exports.updateUser = updateUser;
exports.getUserByUserId = getUserByUserId;
exports.deleteUser = deleteUser;;
exports.createUser = createUser;
exports.getUsers = getUsers;
exports.createCourse = createCourse;
exports.deleteCourse = deleteCourse;
exports.getCoursesByCourseId = getCoursesByCourseId;
exports.deleteCourseByClassId = deleteCourseByClassId;
exports.addCourseByClassId = addCourseByClassId;
exports.getCourse = getCourse;
exports.getSchedule = getSchedule;
exports.getCourseByClassId = getCourseByClassId;
exports.getScheduleByUserId = getScheduleByUserId;
exports.createSchedule = createSchedule;
exports.updateSchedule = updateSchedule;
exports.deleteSchedule = deleteSchedule;
exports.updateCourse = updateCourse;