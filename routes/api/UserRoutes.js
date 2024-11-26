const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    // addAssignment,
    // removeAssignment,
  } = require('../../controllers/userController');
  
  // /api/Users
  router.route('/').get(getUsers).post(createUser);
  
  // /api/Users/:UserId
  router.route('/:UserId').get(getSingleUser).delete(deleteUser);

  // Add and delete friends from user's friend list
  router.route('/api/users/:userId/friends/:friendId').post(addFriend);
  router.route('/api/users/:userId/friends/:friendId').delete(deleteFriend);

  
  // /api/Users/:UserId/assignments
//   router.route('/:UserId/assignments').post(addReaction);
  
  // /api/Users/:UserId/assignments/:assignmentId
//   router.route('/:UserId/assignments/:reactionId').delete(removeReaction);

module.exports = router;