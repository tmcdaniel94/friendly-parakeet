const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
  } = require('../../controllers/userController');
  
  router.route('/').get(getUsers).post(createUser);
  router.route('/:UserId').get(getSingleUser).put(updateUser).delete(deleteUser);
  // Add and delete friends from user's friend list
  router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;