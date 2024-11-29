const router = require('express').Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController.js');

// /api/Thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/Thoughts/:ThoughtId
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:id/reactions').post(addReaction);
router.route('/:id/reactions/:reactionId').delete(removeReaction);

module.exports = router;
