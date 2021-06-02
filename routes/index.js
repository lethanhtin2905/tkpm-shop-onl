var express = require('express');
var router = express.Router();
var homeControllers = require('../controllers/home-controllers');

/* GET home page. */
router.get('/', homeControllers.index);

module.exports = router;
