const express = require('express');
const router = express.Router({ mergeParams: true });

const { getCommentsForPost, addComment } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

// Don't put postId here, because it's already in the parent route!
router.route('/')
  .get(getCommentsForPost)
  .post(protect, addComment);

module.exports = router;
