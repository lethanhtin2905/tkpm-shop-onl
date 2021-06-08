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
// Update Profile
router.post('/update-profile', accountControllers.updateProfile)

// Login Page
router.get('/login', accountControllers.loginPage);
// Login Handle
router.post('/login', accountControllers.loginHandle);

// Checkout Page
router.get('/checkout', ensureAuthenticated, accountControllers.checkoutPage);
// Checkout Handle
router.post('/checkout', orderControllers.checkoutHandle);

module.exports = router;
