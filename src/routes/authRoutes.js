const authController = require('../controller/authController');

const router = require('express').Router();

router.post('/:email', authController.sentOTP);


module.exports = router;