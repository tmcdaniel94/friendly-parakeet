const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
      try {
        const thoughts = await Thought.find();
        res.json(thoughts);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Get a thought
    async getSingleThought(req, res) {
      try {
        const thought = await Thought.findOne({ _id: req.params.id });
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Create a thought
    async createThought(req, res) {
      try {
        const thought = await Thought.create(req.body);
        res.json(thought);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // Delete a thought
    async deleteThought(req, res) {
      try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.id });
  
        if (!thought) {
          res.status(404).json({ message: 'No thought with that ID' });
        }
  
        await User.deleteMany({ _id: { $in: thought.students } });
        res.json({ message: 'thought and user deleted!' });
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Update a thought
    async updateThought(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.id },
          { $set: req.body },
          { runValidators: true, new: true }
        );
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Add reaction
    async addReaction(req, res) {
      try {
        Thought.findOneAndUpdate(
          { _id: req.params.id },
          { $addToSet: { reactions: req.body } },
          { new: true, runValidators: true }
        )
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            res.status(404).json({ message: "No thought found" });
            return;
          }
          res.json(dbThoughtData);
        })
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Remove reaction
    async removeReaction(req,res) {
        Thought.findOneAndUpdate(
          { _id: req.params.id },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { new: true }
        )
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch ((err) => res.json(err));
    },
  };


  