const userController = require('../controller/userController.js');
const { verifyAdmin, verifyToken } = require('../middlewares/authMiddleware.js');
const router = require('express').Router();


router.post('/', userController.createUser);

router.post('/sign-in', userController.login);

router.get('/list', verifyAdmin, userController.getAllUsers);


module.exports = router;
