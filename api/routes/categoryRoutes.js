const express = require('express');
const {
  createCategory,
  getCategories,
  deleteCategory
} = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getCategories)
  .post(protect, createCategory);

router.route('/:id')
  .delete(protect, deleteCategory); // Optional: Admin-only

module.exports = router;
