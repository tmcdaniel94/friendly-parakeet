const { User } = require('../models');

module.exports = {
    // Get all users
    async getUsers(req, res) {
      try {
        const users = await User.find();
        res.json(users);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // Get a single user
    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.id })
          .select('-__v');
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' })
        }
  
        res.json({user});

      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // create a new user
    async createUser(req, res) {
      try {
        const user = await User.create(req.body);
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async updateUser(req, res) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.id },
          { $set: req.body },
          { runValidators: true, new: true }
        );
  
        if (!user) {
          return res.status(404).json({ message: 'No user with this id!' })
        }
  
        res.json({user});
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // Delete a user and remove them from the thought
    async deleteUser(req, res) {
      try {
        const user = await User.findOneAndDelete({ _id: req.params.id });
  
        if (!user) {
          return res.status(404).json({ message: 'No such user exists' });
        }
  
        res.json({ message: 'user successfully deleted' });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    async addFriend(req, res) {
      try {
        User.findOneAndUpdate(
          { _id: req.params.id },
          { $addToSet: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        )
        .then((userFriends) => {
          if (!userFriends) {
            return res.status(404).json({ message: 'No user with this id!' });
          }
          res.json(userFriends);
        })

      } catch(err) {
        res.json(err);
      }
    },
    async removeFriend(req, res) {
      try {
        User.findOneAndUpdate(
          { _id: req.params.id },
          { $pull: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        )
        .then((userFriends) => {
          if (!userFriends) {
            return res.status(404).json({ message: 'No user with this id!' });
          }
        })
      } catch(err) {
        res.json(err);
      }
    },
};