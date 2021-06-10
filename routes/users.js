var express = require('express');
var router = express.Router();
var accountControllers = require('../controllers/account-controllers');
const { ensureAuthenticated } = require('../config/auth');

// Register page
router.get('/register', accountControllers.registerPage);
// Register handle
router.post('/register', accountControllers.registerHandle);

// Profile
router.get('/profile', ensureAuthenticated, accountControllers.profile);
// Update profile
router.post('/update-profile', accountControllers.updateProfile)

// Login page
router.get('/login', accountControllers.loginPage);
// Login handle
router.post('/login', accountControllers.loginHandle);

// Checkout page
router.get('/checkout', ensureAuthenticated, accountControllers.checkoutPage);
// Checkout handle
router.post('/checkout', orderControllers.checkoutHandle);

module.exports = router;
