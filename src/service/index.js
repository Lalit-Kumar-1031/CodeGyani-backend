const AuthService = require("./authService");
const CourseService = require("./courseService");
const TrainingService = require("./trainingService");
const UserService = require("./userService");


const services = {
    userService: new UserService(),
    authService: new AuthService(),
    trainingService: new TrainingService(),
    courseService: new CourseService()
};


module.exports = services;