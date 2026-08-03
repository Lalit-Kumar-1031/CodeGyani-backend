const authController = require('../controller/authController');

const router = require('express').Router();

router.post('/:email/sent-email-otp', authController.sentOTP);

router.post('/:email/verify-email-otp', authController.verifyOTP);


module.exports = router;