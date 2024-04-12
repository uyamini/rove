const Activity = require('../models/activity');
const Review = require('../models/review');
// Define the controller actions separately

const show = async (req, res, next) => {
    try {
      const activity = await Activity.findById(req.params.id)
        .populate('createdBy') // Assuming you want to show who created the activity
        .exec();
      
      const reviews = await Review.find({ activity: req.params.id })
        .populate('author') // Assuming reviews reference their author
        .exec();
  
      res.render('activities/show', { activity, reviews, user: req.user });
    } catch (error) {
      next(error);
    }
  };

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
   show,
};
