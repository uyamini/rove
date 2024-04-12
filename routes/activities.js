// routes/activities.js
const express = require('express');
const router = express.Router();
const activitiesController = require('../controllers/activitiesController');

// List all activities
router.get('/', activitiesController.index);

// Return the form for creating a new activity
// This needs to be above the '/:id' route to avoid being treated as an 'id'
router.get('/new', activitiesController.newForm);

// Create a new activity
router.post('/', activitiesController.create);

// Like an activity, using POST since this changes data
router.post('/:id/like', activitiesController.likeActivity);

// Show details for a specific activity
// This is a parameterized route and should come after more specific routes
router.get('/:id', activitiesController.show);

module.exports = router;

