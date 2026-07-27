const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/authMiddleware');
const {
  getStats,
  listUsers,
  getUserById,
  updateUser,
  deactivateUser,
  deleteUser,
  listPosts,
  deletePost,
  getActivity,
  listAdmins,
  promoteToAdmin,
  demoteAdmin,
  getAuditLogs,
} = require('../controllers/adminController');

// ✅ STATS
router.get('/stats', protect, isAdmin, getStats);

// ✅ USERS
router.get('/users', protect, isAdmin, listUsers);
router.get('/users/:id', protect, isAdmin, getUserById);
router.put('/users/:id', protect, isAdmin, updateUser);
router.patch('/users/:id/deactivate', protect, isAdmin, deactivateUser);
router.delete('/users/:id', protect, isAdmin, deleteUser);

// ✅ POSTS
router.get('/posts', protect, isAdmin, listPosts);
router.delete('/posts/:id', protect, isAdmin, deletePost);

// ✅ ADMINS
router.get('/admins', protect, isAdmin, listAdmins);
router.post('/admins/:userId/promote', protect, isAdmin, promoteToAdmin);
router.post('/admins/:userId/demote', protect, isAdmin, demoteAdmin);

// ✅ ACTIVITY / AUDIT
router.get('/activity', protect, isAdmin, getActivity);
router.get('/audit', protect, isAdmin, getAuditLogs);

module.exports = router;
