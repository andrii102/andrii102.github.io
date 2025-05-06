const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const authMiddleware = require('../../middleware/authMiddleware');

// Protected routes
router.get('/me', 
    authMiddleware.authenticateUser, 
    authController.getCurrentUser
);

// Authentication routes
router.post('/register', authController.register);


module.exports = router;