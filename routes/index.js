var express = require('express');
var router = express.Router();
var homeControllers = require('../controllers/home-controllers');

// Home page 
router.get('/', homeControllers.index);

// Store
router.get('/store', productControllers.displayProducts);
// All product
router.get('/product', productControllers.displayProducts);

// Product information
router.get('/product/:id', productControllers.productInfo);

// Post comment
router.post('/product/comment/:id', productControllers.comment);

// Search result page
router.get('/search', productControllers.searchPage);

// Search handle
router.post('/search', productControllers.searchHandle);

// Advance filter
router.post('/store', productControllers.filter);

// Cart
router.get('/cart', productControllers.cart);

module.exports = router;