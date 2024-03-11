const express = require('express');
const router = express.Router();
const campController = require('../controller/donationCamp');
const upload = require('../utils/slipupload');

// Route for creating a new camp with file upload
router.post('/camps', upload.single('marketingSlip'), campController.createCamp);

// Route for getting all camps
router.get('/camps', campController.getAllCamps);

// Route for getting a single camp by ID
router.get('/camps/:id', campController.getCampById);

// Route for updating a camp by ID
router.put('/camps/:id', campController.updateCamp);

// Route for deleting a camp by ID
router.delete('/camps/:id', campController.deleteCamp);

module.exports = router;
