const express = require('express');
const router = express.Router();

const { getMe, updateMe } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/me', protect, getMe);
router.put('/me', protect, upload.single('profilePicture'), updateMe);

module.exports = router;
