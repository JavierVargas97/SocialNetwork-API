const { Thought, User } = require('../models');

module.exports = {
  // Get all courses
  getCourses(req, res) {
    Course.find()
      .then((courses) => res.json(courses))
      .catch((err) => res.status(500).json(err));
  },
            // Get a course
  getSingleCourse(req, res) {
    Thought.findOne({ _id: req.params.courseId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No course with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createCourse(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return.User.findOneAndUpdate(
          { username: req.body.username },
          { $push: { thoughts: _id } },
          { new: true }
        )
      })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Username not found" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },



            // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          )
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'User not found! now thought is delete,' })
          : res.json({ message: 'Thought deleted' })
      )
      .catch((err) => res.status(500).json(err));
  },

  
            // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
