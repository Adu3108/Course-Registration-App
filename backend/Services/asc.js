var express = require('express');
var app = express();
app.use(express.json())
app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var cors = require("cors");
app.use(cors());

var session = require('express-session');
app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));

// Database Connection
const client = require("../config");

client.connect((err) => { 
   if (err) {
      console.log(err); 
   }
   else {
      console.log("Data logging initiated!");
   }
});

// Users
const  user  =  require("./routes/user");

app.use("/user",  user); 

const home = require("./controllers/home");
const courses = require('./controllers/courses');
const departments = require('./courses/departments');
const department_course = require('./courses/department_course');
const course_info = require('./courses/course_info');
const instructor = require('./instructor/instructor_info');
const course_reg = require('./controllers/course_reg');
const current_courses = require('./courses/current_courses');
const drop_course = require('./controllers/drop_course');
const search = require('./controllers/search');

// Endpoint for Login
app.get('/user/login/', function (req, res) {
   res.sendFile( __dirname + "/templates/" + "login_form.html" );
})

// Endpoint for Registration
app.get('/user/register/', function (req, res) {
    res.sendFile( __dirname + "/templates/" + "register_form.html" );
 })
 
// Endpoint for getting information about a student along with the courses taken by the student
app.get('/student_info/:ID', function (req, res) {
   home.student_details(req, res);
})

app.get('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

app.post('/home/registration', function (req, res) {
   console.log("Got a POST request for the homepage");
   course_reg.course_reg(req, res);
})

// Endpoint for listing all the departments
app.get('/course/running', function(req, res) {
   departments.department_list(req, res);
})

// Endpoints for listing all the courses in a particular department
app.get('/course/running/:dept_name', function(req, res) {
   department_course.department_course_list(req, res);
})

// Endpoint for getting all information about a particular course
app.get('/course/:course_id', function (req, res) {
   course_info.course_info(req,res);
})

// Endpoint for getting all information about an instructor
app.get('/instructor/:instructor_id', function (req, res) {
   instructor.instructor_info(req, res);
})

// Endpoint for listing all the courses
app.get('/courses', function(req, res) {
   courses.course_list(req, res);
})

// Endpoint for listing all the courses running in the current semester
app.get('/current_courses', function(req, res) {
   current_courses.current_courses(req, res);
})

// Endpoint to drop a course from current semester
app.post('/drop_course', function(req, res) {
   drop_course.drop_course(req, res);
})

// Endpoint for searching similar courses
app.post('/search', function(req, res) {
   search.search(req, res);
})

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})