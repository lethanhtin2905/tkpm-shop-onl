var express = require('express');
var router = express.Router();
var accountControllers = require('../controllers/account-controllers');
const { ensureAuthenticated } = require('../config/auth');

// Register Page
router.get('/register', accountControllers.registerPage);

// Register Handle
router.post('/register', accountControllers.registerHandle);

// Profile
router.get('/profile', ensureAuthenticated, accountControllers.profile);

// Login Page
router.get('/login', accountControllers.loginPage);

// Login Handle
router.post('/login', accountControllers.loginHandle);

module.exports = router;
