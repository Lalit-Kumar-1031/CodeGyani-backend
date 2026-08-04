const userRoutes = require('./userRoutes.js');
const router = require('express').Router();
const authRoutes = require('./authRoutes.js');
const trainingRoutes = require('./trainingRoutes.js');
const courseRoutes = require('./courseRoutes.js');


router.use('/api/auth', authRoutes);

router.use('/api/v1/users/', userRoutes);

router.use('/api/v1/training', trainingRoutes);

router.use('/api/v1/courses', courseRoutes);

module.exports = router;
