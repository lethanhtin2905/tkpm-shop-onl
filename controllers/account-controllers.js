const bcrypt = require('bcryptjs');
const passport = require('passport');
const nodemailer = require('nodemailer');

// Configure nodemailer
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'electro@gmail.com',
        pass: 'hcmus18120595'
    }
});

var mailOptions = {
    from: 'electro@gmail.com'
};

// Models
var User = require('../models/user');

// Register page
exports.registerPage = (req, res) => {
    res.render('pages/account/register');
}

// Register handle
exports.registerHandle = (req, res) => {
    const { name, email, password } = req.body;
    let errors = [];

    if (errors.length > 0) {
        res.render('pages/account/register', {
            errors
        });
    } else {
        // Validation passed
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    // User exists
                    errors.push({ msg: 'Email đã được đăng ký. Vui lòng nhập email khác.' });
                    res.render('pages/account/register', { errors });
                } else {
                    const newUser = new User({ name, email, password });

                    // Hash password
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            // Set password to hashed
                            newUser.password = hash;
                            // Save user
                            newUser.save()
                                .then(user => {
                                    // Configure mailOptions
                                    mailOptions.to = email;
                                    mailOptions.subject = 'Kích hoạt tài khoản';
                                    mailOptions.text = 'Truy cập đường dẫn sau để kích hoạt tài khoản ' +
                                        req.protocol + '://' + req.get('host') + '/users/activate/' + user._id;

                                    // Send email
                                    transporter.sendMail(mailOptions, function (error, info) {
                                        if (error) {
                                            console.log(error);
                                        } else {
                                            console.log('Email sent: ' + info.response);
                                        }
                                    });

                                    req.flash('success_msg', 'Bạn đã đăng ký thành công, vui lòng kiểm tra email và kích hoạt tài khoản');
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));
                        }));
                }
            });
    }
}

// Activate account page
exports.activatePage = (req, res) => {
    // Find user by ID
    User.findOne({ _id: req.params.id })
        .then(user => {
            user.activated = true;
            user.save();
            res.render('pages/account/activate');
        })
        .catch(err => console.log(err));
}

// Profile page
exports.profile = (req, res) => {
    res.render('pages/account/profile', { user: req.user });
}

// Update profile
exports.updateProfile = (req, res) => {
    let errors = [];
    const newName = req.body.name;
    const newPhone = req.body.phone;
    const newAddress = req.body.address;

    User.findOne({ _id: req.user._id }) // Find user by ID
        .then(user => {
            if (newName != '') {
                user.name = newName;
            }
            if (newPhone != '') {
                user.phone = newPhone;
            }
            if (newAddress != '') {
                user.address = newAddress;
            }
            user.save()
                .then(user => {
                    req.flash('success_msg', 'Bạn đã cập nhật thành công');
                    res.redirect('/users/profile');
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}

// Login page
exports.loginPage = (req, res) => {
    res.render('pages/account/login');
}

// Login handle
exports.loginHandle = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/users/profile',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
}

// Checkout Page
exports.checkoutPage = (req, res) => {
    res.render('pages/order/checkout', { user: req.user });
}