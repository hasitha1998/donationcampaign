const express = require('express');
const organizerController = require('../controller/organizerController');

const router = express.Router();

// Student registration route
router.post('/register', organizerController.registerStudent);

// Student login route
router.post('/login', organizerController.loginStudent);

// Route to get all students
router.get('/organizers', organizerController.getAllStudents);

// Route to get one student by ID
router.get('/:id', organizerController.getOneStudent);

// Route to delete a student by ID
router.delete('/:id', organizerController.deleteStudent);

router.put('/organizers/:id', organizerController.updateOrganizerStatus);

module.exports = router;
