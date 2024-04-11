const Activity = require('../models/activity');

// Define the controller actions separately
const index = async (req, res) => {
  const activities = await Activity.find({});
  res.render('activities/index', { activities });
};

const newForm = (req, res) => {
  res.render('activities/new');
};

const create = async (req, res) => {
  await Activity.create(req.body);
  res.redirect('/activities');
};

const likeActivity = async (req, res) => {
  const { id } = req.params;
  await Activity.findByIdAndUpdate(id, { $inc: { likes: 1 } });
  res.redirect('/activities'); // Or wherever you'd like to redirect
};

// Export all controller actions together at the end
module.exports = {
  index,
  newForm,
  create,
  likeActivity,
};
