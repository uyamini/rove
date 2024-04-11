// routes/activities.js
const express = require('express');
const router = express.Router();
const activitiesController = require('../controllers/activitiesController');

router.get('/', activitiesController.index); // List all activities
router.post('/', activitiesController.create); // Create a new activity
router.get('/new', activitiesController.newForm); // Return the form for creating a new activity
// Add routes for show, edit, update, and delete as needed
router.post('/:id/like', activitiesController.likeActivity);

module.exports = router;
