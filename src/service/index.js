const AuthService = require("./authService");
const TrainingService = require("./trainingService");
const UserService = require("./userService");


const services = {
    userService: new UserService(),
    authService: new AuthService(),
    trainingService: new TrainingService()
};


module.exports = services;