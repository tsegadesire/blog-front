// blog-backend/controllers/uploadController.js

// @desc    Handle file upload
// @route   POST /api/upload
// @access  Public (or Private if you add authentication middleware)
exports.uploadFile = (req, res) => {
  // Multer adds the file object to req.file
  if (req.file) {
    // You can save the file path to a database here
    // For example, if you have a User model and want to save a profile picture:
    // await User.findByIdAndUpdate(req.user.id, { profilePicture: `/uploads/${req.file.filename}` });


    res.status(200).json({
      message: 'File uploaded successfully',
      filePath: `/uploads/${req.file.filename}` // Return the accessible path
    });
  } else {
    // This part is crucial for handling Multer errors
    // Multer errors (like file type or size) are often caught by the error handler in your main app.js
    // but you might want to return a specific message if no file was received.
    res.status(400).json({ message: 'No file uploaded or file type not supported.' });
  }
};

// If you have routes for multiple files, you'd add corresponding functions here.
// exports.uploadMultipleFiles = (req, res) => { /* ... */ };
// exports.uploadFields = (req, res) => { /* ... */ };