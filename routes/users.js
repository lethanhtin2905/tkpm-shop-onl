var express = require('express');
var router = express.Router();
var accountControllers = require('../controllers/account-controllers');
const { ensureAuthenticated } = require('../config/auth');

// Register Page
router.get('/register', accountControllers.registerPage);

// Register Handle
router.post('/register', accountControllers.registerHandle);

module.exports = router;
