const express = require('express');
const router = express.Router();
const passport = require('passport');
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const multer = require("multer");
const path = require("path");
const crypto = require('crypto');
const location = require('@derhuerst/location');

const User = require('../models/user');
const VehicleLicence = require('../models/vehicle_licence');
const VehicleLicenceHistory = require('../models/vehicle_licence_history');

const options = {
    auth: {
        api_user: "dollarman2",
        api_key: "Professionals@2017"
    }
};

const client = nodemailer.createTransport(sgTransport(options));

// registering user to mongodb

router.post('/register', (req, res, next) => {
    User.findOne({ email: req.body.email }, function(error, user) {
        if (error) {
            res.json(error);
        } else if (!user) {
            let user = new User();
            user.first_name = req.body.first_name;
            user.last_name = req.body.last_name;
            user.dob = req.body.dob;
            user.sex = req.body.sex;
            user.state = req.body.state;
            user.occupation = req.body.occupation;
            user.residential_address = req.body.residential_address;
            user.email = req.body.email;
            user.password = User.hashPassword(req.body.password);
            user.temporarytoken = crypto.randomBytes(20).toString('hex');
            user.created_at = Date.now();
            try {
                //getting mail data
                let email = {
                    from: 'Tradedeport, tradedeport@tradedeport.com',
                    to: user.email,
                    subject: 'Activation Link',
                    text: 'Hello ' + user.fullname + ', Thank you for registering at Tradedeport. Please click the link below to complete registration http://localhost:8000/api/activate/' + user.temporarytoken,
                    html: 'Hello<strong> ' + user.first_name + ' ' + user.last_name + ' </strong><br/><br/> Thank you for registering to tradedeport.com. Please click the link below to complete registration.<br/>http://localhost:4200/activate/' + user.temporarytoken
                };

                //sending mail
                client.sendMail(email, function(err, info) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Message sent: " + info.response);
                    }
                });
                user.save();
                return res.status(201).json(user);
            } catch (error) {
                return res.status(501).json(error);
            }
        } else if (user) {
            return res.status(501).json({ error: 'User Already exist!' });
        }
    });

});

router.get('/location', (req, res) => {
    location((err, loc) => {
        if (err) console.error(err);
        else res.json(loc);
    })
});

router.post('/licence-apply', isValidUser, (req, res, next) => {
    VehicleLicence.findOne({ user: req.user._id }, function(error, user) {
        if (error) {
            res.json(error);
        } else if (!user) {

            let licence = new VehicleLicence();
            licence.application_type = req.body.application_type;
            licence.user = req.user._id
            licence.score = req.body.score;
            licence.lat = req.body.lat;
            licence.lng = req.body.lng;
            try {
                //getting mail data
                let email = {
                    from: 'Tradedeport, tradedeport@tradedeport.com',
                    to: user.email,
                    subject: 'Activation Link',
                    text: 'Hello ' + user.fullname + ', Thank you for registering at Tradedeport. Please click the link below to complete registration http://localhost:8000/api/activate/' + user.temporarytoken,
                    html: 'Hello<strong> ' + user.first_name + ' ' + user.last_name + ' </strong><br/><br/> Thank you for registering to tradedeport.com. Please click the link below to complete registration.<br/>http://localhost:4200/activate/' + user.temporarytoken
                };

                //sending mail
                client.sendMail(email, function(err, info) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Message sent: " + info.response);
                    }
                });
                licence.save();
                let process = new VehicleLicenceHistory();
                process.user = req.user._id;
                process.licence = licence._id;
                process.type = req.body.type;
                proccess.save();
                return res.status(201).json(user);
            } catch (error) {
                return res.status(501).json(error);
            }
        } else {
            let email = {
                from: 'Tradedeport, tradedeport@tradedeport.com',
                to: user.email,
                subject: 'Activation Link',
                text: 'Hello ' + user.fullname + ', Thank you for registering at Tradedeport. Please click the link below to complete registration http://localhost:8000/api/activate/' + user.temporarytoken,
                html: 'Hello<strong> ' + user.first_name + ' ' + user.last_name + ' </strong><br/><br/> Thank you for registering to tradedeport.com. Please click the link below to complete registration.<br/>http://localhost:4200/activate/' + user.temporarytoken
            };

            //sending mail
            client.sendMail(email, function(err, info) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Message sent: " + info.response);
                }
            });
            let process = new VehicleLicenceHistory();
            process.user = req.user._id;
            process.licence = licence._id;
            process.type = req.body.type;
            proccess.save
        }
    });

});

router.patch('/activate/:token', (req, res, next) => {
    User.findOne({ temporarytoken: req.params.token }, function(error, user) {
        if (error) {
            res.json(error);
        } else if (!user) {
            res.json({ 'msg': 'token do not math' });
        } else {
            user.temporarytoken = false;
            user.is_active = true;

            //getting mail data

            let email = {
                from: 'Tradedeport, tradedeport@tradedeport.com',
                to: user.email,
                subject: 'Account Activated',
                text: 'Hello ' + user.first_name + ' ' + user.last_name + ', Thank you for registering at Tradedeport. Your Account has been activated successfully.',
                html: 'Hello<strong> ' + user.first_name + ' ' + user.last_name + '</strong>,<br/><br/> Thank you for registering to tradedeport. Your Account has been activated successfully.'
            };

            //getting mail data

            client.sendMail(email, function(err, info) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Message sent: " + info.response);
                }
            });
            user.save();
            return res.status(201).json(user);
        }

    });
});

//authenticating and login in user

router.post('/login', (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return res.status(501).json(err); }
        if (!user) { return res.status(501).json(info); }
        if (user.is_active != true) { return res.status(401).json({ msg: 'User not activated' }); }
        req.logIn(user, function(err) {
            if (err) { res.status(501).json(err); }
            return res.status(201).json({ 'msg': 'Login Successful!' });
        });
    })(req, res, next);

});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/user', isValidUser, function(req, res, next) {
    return res.status(200).json(req.user);
});

router.get("/logout", isValidUser, function(req, res, next) {
    req.logout();
    return res.status(200).json({ 'msg': 'Logout Successfull!' });
});

router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/user',
        failureRedirect: '/login'
    })
);



//administrative api

router.get('/users', (req, res, next) => {
    User.find(function(err, users) {
        if (err) { res.status(501).json(err); }
        res.json(users);
    });
});

router.get('/users/:id', (req, res, next) => {
    User.findOne({ _id: req.params.id }, function(error, user) {
        if (error) {
            res.json(error);
        } else {
            res.json(user);
        }

    });

});

router.delete('/users/:id', (req, res, next) => {
    User.remove({ _id: req.params.id }, function(error, result) {
        if (error) {
            res.json(error);
        } else {
            res.json(result);
        }

    });

});

//validation check
function isValidUser(req, res, next) {
    if (req.isAuthenticated()) next();
    else return res.status(401).json({ 'msg': 'UnAuthorized Request!' });
}

module.exports = router;