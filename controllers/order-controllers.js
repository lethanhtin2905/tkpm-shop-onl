const functions = require('../controllers/functions');
var Order = require('../models/order');

// Checkout Handle
exports.checkoutHandle = (req, res) => {
    var tokens = req.body.items.split('//');
    tokens.pop(); // The last element is empty

    var newOrder = new Order({
        date: new Date(),
        userID: req.user._id,
        username: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        note: req.body.note,
        totalCost: req.body.total,
        status: 0
    })

    tokens.forEach(entry => {
        var properties = entry.split(';');
        newOrder.items.push({
            _id: properties[0],
            name: properties[1],
            quantity: parseInt(properties[2])
        });
    });

    newOrder.save();

    res.redirect('/users/order-management');
}