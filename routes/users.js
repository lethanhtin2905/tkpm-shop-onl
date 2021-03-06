var express = require('express');
var router = express.Router();
var accountControllers = require('../controllers/account-controllers');
var orderControllers = require('../controllers/order-controllers');
const { ensureAuthenticated } = require('../config/auth');

// Register page
router.get('/register', accountControllers.registerPage);
// Register handle
router.post('/register', accountControllers.registerHandle);

// Activate 
router.get('/activate/:id', accountControllers.activatePage);

// Profile
router.get('/profile', ensureAuthenticated, accountControllers.profile);
// Update profile
router.post('/update-profile', accountControllers.updateProfile)

// Login page
router.get('/login', accountControllers.loginPage);
// Login handle
router.post('/login', accountControllers.loginHandle);

// Forget password page
router.get('/forget-password', accountControllers.forgetPasswordPage);
// Forget password handle
router.post('/forget-password', accountControllers.forgetPasswordHandle);

// Logout handle
router.get('/logout', accountControllers.logoutHandle);

// Change password page
router.get('/change-password', ensureAuthenticated, accountControllers.changePasswordPage);
// Change password handle
router.post('/change-password', accountControllers.changePasswordHandle);

// Reset password page
router.get('/reset-password', accountControllers.resetPasswordPage);
// Reset password handle
router.post('/reset-password', accountControllers.resetPasswordHandle);

// Checkout page
router.get('/checkout', ensureAuthenticated, orderControllers.checkoutPage);
// Checkout handle
router.post('/checkout', orderControllers.checkoutHandle);

// Order management
router.get('/order-management', ensureAuthenticated, orderControllers.orderManagement);

// Track order
router.get('/track-order/:id', ensureAuthenticated, orderControllers.trackOrder);

module.exports = router;
