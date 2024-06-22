const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth'); // Import the auth middleware

const router = new express.Router();

// Register
router.post('/register', userController.registerController);

// Login
router.post('/login', userController.loginController);

// List Users (secured route)
router.get('/users', auth, userController.listUsersController);

module.exports = router;
