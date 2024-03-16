const express = require('express');
const organizerController = require('../controller/organizerController');

const router = express.Router();

// Student registration route
router.post('/register', organizerController.registerBloodCampOrg);

// Student login route
router.post('/login', organizerController.loginOrganizer);

// Route to get all students
router.get('/organizers', organizerController.getAllOrganizers);

// Route to get one student by ID
router.get('/:id', organizerController.getOneOrganizer);

// Route to delete a student by ID
router.delete('/:id', organizerController.deleteOrganizer);

router.put('/organizers/:id', organizerController.updateOrganizerStatus);

module.exports = router;
