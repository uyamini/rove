//routes/auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to initiate Google OAuth
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;
