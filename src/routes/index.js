const userRoutes = require('./userRoutes.js');
const router = require('express').Router();


router.use('/api/v1/users/', userRoutes);

module.exports = router;
