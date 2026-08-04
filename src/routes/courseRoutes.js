const courseController = require('../controller/courseController');

const router = require('express').Router();



router.post('/', courseController.createCourse);

router.get('/all', courseController.fetchCourses);

router.get('/:customId/details', courseController.fetchCourse);

router.patch('/:customId/details', courseController.updateCourse);

router.delete('/:customId', courseController.deleteCourse);


module.exports = router;
