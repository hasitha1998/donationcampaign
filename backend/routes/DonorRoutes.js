const express = require('express');
const donorController = require('../controller/donorController');

const router = express.Router();

// Student registration route
router.post('/register', donorController.registerDonor);

// Student login route
router.post('/login', donorController.loginDonor);

// Route to get all students
router.get('/donors', donorController.getAllDonors);

// Route to get one student by ID
router.get('/:id', donorController.getOneDonor);

// Route to delete a student by ID
router.delete('/:id', donorController.deleteDonor);

router.put('/donors/:id', donorController.updateDonorStatus);

// Route to fetch donor account status by email
router.post('/status', donorController.getDonorStatus);

module.exports = router;
