const AuthService = require("./authService");
const UserService = require("./userService");


const services = {
    userService: new UserService(),
    authService: new AuthService()
};


module.exports = services;