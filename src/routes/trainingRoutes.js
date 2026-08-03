const trainingContoller = require('../controller/trainingController');

const router = require('express').Router();


router.post('/', trainingContoller.creatreTraining);

router.get('/', trainingContoller.fetchTrainings);

router.patch('/:customId', trainingContoller.updateTraining);

router.delete('/:customId', trainingContoller.deleteTraining);

router.get('/:customId/details', trainingContoller.fetchTraining);


module.exports = router;
