// blog-backend/routes/postRoutes.js
const upload = require('../middleware/upload');
const express = require('express'); // This is the only place express should be required
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getUserPosts,
  likePost,
  unlikePost,
  incrementView,
  getMyAnalytics
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();
const commentRoutes = require('./commentRoutes');

// other post routes...
router.use('/:postId/comments', commentRoutes);

router.route('/')
  .get(getPosts)
   .post(protect, upload.single('image'), createPost);

// --- NEW ROUTE FOR USER'S OWN POSTS ---
router.get('/my-posts', protect, getUserPosts); // This route must come before /:id to avoid conflict
// --- END NEW ROUTE ---

// --- Analytics for current user's posts ---
router.get('/my-analytics', protect, getMyAnalytics);

// --- Reactions & Views ---
router.post('/:id/like', protect, likePost);
router.post('/:id/unlike', protect, unlikePost);
router.post('/:id/view', incrementView);

router.route('/:id')
  .get(getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;