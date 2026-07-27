const User = require('../models/User');
const Post = require('../models/Post');

// GET /api/admin/stats
// Returns total users, posts, admins, and flagged (not implemented -> 0)
const getStats = async (req, res, next) => {
  try {
    const [users, posts, admins] = await Promise.all([
      User.countDocuments({}),
      Post.countDocuments({}),
      User.countDocuments({ role: 'admin' }),
    ]);

    // No flagged field in Post schema; return 0 for now
    res.json({ users, posts, admins, flagged: 0 });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/users
// Returns list of users
const listUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, '-password').lean();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/users/:id
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// PUT /api/admin/users/:id
const updateUser = async (req, res, next) => {
  try {
    const updates = {};
    const allowed = ['username', 'email', 'role', 'active'];
    allowed.forEach(k => {
      if (req.body[k] !== undefined) updates[k] = req.body[k];
    });
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// PATCH /api/admin/users/:id/deactivate
const deactivateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { active: false }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/admin/users/:id
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/posts
// Returns list of posts with author basic info
const listPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({})
      .populate('user', 'username email')
      .sort({ createdAt: -1 })
      .lean();

    // Map to expected shape used by frontend (author field)
    const mapped = posts.map(p => ({
      _id: p._id,
      title: p.title,
      category: p.category,
      createdAt: p.createdAt,
      author: p.user ? { _id: p.user._id, username: p.user.username, email: p.user.email } : null,
    }));

    res.json(mapped);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/admin/posts/:id
const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/activity
// Returns simple combined recent activity (latest users and posts)
const getActivity = async (req, res, next) => {
  try {
    const [latestUsers, latestPosts] = await Promise.all([
      User.find({}, '-password').sort({ createdAt: -1 }).limit(5).lean(),
      Post.find({}).sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    const activity = [];
    latestUsers.forEach(u => {
      activity.push({
        _id: `user-${u._id}`,
        type: 'USER_CREATED',
        message: `New user registered: ${u.username || u.email}`,
        createdAt: u.createdAt || new Date(),
      });
    });
    latestPosts.forEach(p => {
      activity.push({
        _id: `post-${p._id}`,
        type: 'POST_CREATED',
        message: `New post: ${p.title}`,
        createdAt: p.createdAt || new Date(),
      });
    });

    // Sort by createdAt desc
    activity.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(activity);
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/admins
const listAdmins = async (req, res, next) => {
  try {
    const admins = await User.find({ role: { $in: ['admin', 'superadmin'] } }, '-password').lean();
    res.json(admins);
  } catch (err) {
    next(err);
  }
};

// POST /api/admin/admins/:userId/promote
const promoteToAdmin = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { role: 'admin' }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// POST /api/admin/admins/:userId/demote
const demoteAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const newRole = 'user';
    user.role = newRole;
    await user.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/audit (placeholder using same as activity for now)
const getAuditLogs = async (req, res, next) => {
  try {
    // Placeholder: reuse getActivity for now
    return getActivity(req, res, next);
  } catch (err) {
    next(err);
  }
};

module.exports = {
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
};
