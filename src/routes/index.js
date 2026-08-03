const userRoutes = require('./userRoutes.js');
const router = require('express').Router();
const authRoutes = require('./authRoutes.js');
const trainingRoutes = require('./trainingRoutes.js');


router.use('/api/auth', authRoutes);

router.use('/api/v1/users/', userRoutes);

router.use('/api/v1/training', trainingRoutes);

module.exports = router;
