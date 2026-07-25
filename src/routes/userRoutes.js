const userController = require('../controller/userController.js');
const router = require('express').Router();


router.post('/', userController.createUser);

router.post('/sign-in', userController.login);

router.post('/list', userController.getAllUsers);


module.exports = router;
