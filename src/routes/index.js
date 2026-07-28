const userRoutes = require('./userRoutes.js');
const router = require('express').Router();
const authRoutes = require('./authRoutes.js');


router.use('/api/v1/users/', userRoutes);

router.use('/api/auth', authRoutes);

module.exports = router;
