const express = require('express');
const userController = require('../controller/userController');
const upload = require('../utils/upload.js'); 

const router = express.Router();

// User registration route
router.post('/register', upload.single('profilepic'), userController.registerUser);

// User login route
router.post('/login', upload.single(null),userController.loginUser);

module.exports = router;
