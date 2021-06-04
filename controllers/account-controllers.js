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

// Register Page
exports.registerPage = (req, res) => {
    res.render('pages/account/register');
}

// Register Handle
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
