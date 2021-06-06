var express = require('express');
var router = express.Router();
var homeControllers = require('../controllers/home-controllers');

// Home page. 
router.get('/', homeControllers.index);

// Store
router.get('/store', productControllers.displayProducts);
router.get('/product', productControllers.displayProducts);

// Product Information
router.get('/product/:id', productControllers.productInfo);

module.exports = router;
