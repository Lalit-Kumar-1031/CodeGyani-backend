const userController = require('../controller/userController.js');
const router = require('express').Router();


router.post('/', userController.createUser);


module.exports = router;
