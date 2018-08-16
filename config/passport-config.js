const passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy
  , LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/user');

var configAuth = require('./api_auth.config');

passport.use('local',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(username, password, done) {
        User.findOne({ email: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.isValid(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
        });
    }
));

passport.use('facebook',new FacebookStrategy({

    // pull in our app id and secret from our auth.js file
    clientID        : configAuth.facebookAuth.clientID,
    clientSecret    : configAuth.facebookAuth.clientSecret,
    callbackURL     : configAuth.facebookAuth.callbackURL

  },

// facebook will send back the token and profile
  function(email) {
      User.findOne({ 'email' : profile.emails[0].value }, function(err, user) {
          // ie an error connecting to the database
          if (err)
              return done(err);
          if (user) {
              return done(null, user); // user found, return that user
          } else {
              // if there is no user found with that facebook id, create them
              let newUser = new User();                  
              newUser.temporarytoken = token; 
              newUser.last_name = profile.name.familyName;
              newUser.first_name  = profile.name.givenName;
              newUser.email = profile.emails[0].value; 
              newUser.created_at = Date.now();
              // save our user to the database
              newUser.save(function(err) {
                  if (err)
                      throw err;

                  // if successful, return the new user
                  return done(null, newUser);
              });
          }

      });
    }
  ));



  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});