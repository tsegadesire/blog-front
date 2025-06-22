const User = require('../models/User');

// GET /api/users/me
exports.getMe = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/users/me
exports.updateMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.file) {
      user.profilePic = req.file.filename;
    }

    const updatedUser = await user.save();

   const userToReturn = updatedUser.toObject();
delete userToReturn.password;

userToReturn.profilePicUrl = `http://localhost:5000/uploads/profile/${updatedUser.profilePic}`;

res.json(userToReturn);
console.log('REQ FILE:', req.file);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
