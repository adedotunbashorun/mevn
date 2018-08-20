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
            user.name = req.body.name;
            user.phone = req.body.phone;
            user.purpose = req.body.purpose;
            user.email = req.body.email;
            user.password = User.hashPassword(req.body.password);
            user.temporarytoken = crypto.randomBytes(20).toString('hex');
            user.created_at = Date.now();
            try {
                //getting mail data
                let email = {
                    from: 'MEVN, mevn@adedotun.com',
                    to: user.email,
                    subject: 'Activation Link',
                    text: 'Hello ' + user.name + ', Thank you for registering at MEVN. Please click the link below to complete registration http://localhost:8080/api/activate/' + user.temporarytoken,
                    html: 'Hello<strong> ' + user.name + ' </strong><br/><br/> Thank you for registering at MEVN. Please click the link below to complete registration.<br/>http://localhost:8080/activate/' + user.temporarytoken
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
                return res.status(201).json({ msg: 'success', success: 'Registration Successful', user: user });
            } catch (error) {
                return res.status(501).json({ error: error });
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
                from: 'MENV, mevn@adedotun.com',
                to: user.email,
                subject: 'Account Activated',
                text: 'Hello ' + user.name + ', Thank you for registering at MENV. Your Account has been activated successfully.',
                html: 'Hello<strong> ' + user.name + '</strong>,<br/><br/> Thank you for registering to MENV. Your Account has been activated successfully.'
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
            return res.status(201).json({ user: user, msg: "Your account has been activated successfully" });
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