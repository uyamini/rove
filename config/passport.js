// config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    //Check if email ends with @u.northwestern.edu
    const email = profile.emails[0].value;
    if (!email.endsWith('@u.northwestern.edu')) {
      return cb(null, false, { message: 'Not a Northwestern email' });
    }

    User.findOne({ googleId: profile.id }, function (err, user) {
      if (err) { return cb(err); }
      if (!user) {
        user = new User({ googleId: profile.id, name: profile.displayName });
        user.save(function(err) {
          if (err) console.log(err);
          return cb(err, user);
        });
      } else {
        return cb(err, user);
      }
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
