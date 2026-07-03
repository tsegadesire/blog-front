const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getCommentsForPost,
  addComment,
  likeComment,
  deleteComment,
  addReply
} = require('../controllers/commentController');

// Get comments for a post
router.get('/:postId', getCommentsForPost);

// Add a comment
router.post('/', protect, addComment);

// Add a reply
router.post('/:commentId/reply', protect, addReply);

// Like or unlike a comment
router.put('/:id/like', protect, likeComment);

// Delete a comment
router.delete('/:id', protect, deleteComment);

module.exports = router;
