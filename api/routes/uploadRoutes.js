const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path'); // Node.js built-in module for path manipulation
const { uploadFile } = require('../controllers/uploadController'); // We'll create this controller

// --- Multer Configuration ---
// 1. Storage: Where to save the files and how to name them
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder for uploads
    // __dirname is the current directory of uploadRoutes.js
    // We go up two levels to get to blog-backend/ and then into 'uploads'
    cb(null, path.join(__dirname, '..', '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    // Set the file name: fieldname-timestamp.ext
    // Example: profile-1678888888888.jpeg
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// 2. File Filter: What file types are allowed
const fileFilter = (req, file, cb) => {
  // Allowed extensions (e.g., images only)
  const filetypes = /jpeg|jpg|png|gif/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true); // Accept file
  } else {
    cb(new Error('Only images (JPEG, JPG, PNG, GIF) are allowed!')); // Reject file
  }
};

// 3. Initialize Multer
// Limit file size to 5MB (5 * 1024 * 1024 bytes)
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// --- Routes ---

// Route for single file upload
// 'file' is the name of the field in the form that holds the file
router.post('/', upload.single('file'), uploadFile);

module.exports = router;