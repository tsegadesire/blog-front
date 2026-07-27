const express = require('express');
const router = express.Router();

const { getMe, updateMe, getUsers, getUserById, deleteUser } = require('../controllers/userController');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/me', protect, getMe);
router.put('/me', protect, upload.single('profilePicture'), updateMe);

// Admin routes
router.get('/', protect, isAdmin, getUsers);
router.get('/:id', protect, isAdmin, getUserById);
router.delete('/:id', protect, isAdmin, deleteUser);

module.exports = router;
