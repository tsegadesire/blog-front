// blog-backend/controllers/postController.js (Updated)
const Post = require('../models/Post'); // Assuming you have a Post model
const Comment = require('../models/Comment');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username email').sort({ createdAt: -1 }); // Populate user info
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'username email');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user's posts
// @route   GET /api/posts/user/:id
// @access  Public
exports.getUserPosts = async (req, res) => {
  try {
    // req.user is populated by the protect middleware
    const posts = await Post.find({ user: req.user.id }).populate('user', 'username email').sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
exports.createPost = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: No user info found" });
    }

    const { title, summary, content, category } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!title || !summary || !content) {
      return res.status(400).json({ message: "Title, summary and content are required" });
    }

    const newPost = new Post({
      title,
      summary,
      content,
      category,
      image,
      user: req.user._id, 
      // set the user from auth middleware
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server error while creating post" });
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Ensure the logged-in user is the owner of the post, unless admin
    if (post.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to update this post' });
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('user', 'username email');
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Ensure the logged-in user is the owner of the post, unless admin
    if (post.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to delete this post' });
    }

    await Post.deleteOne({ _id: req.params.id }); // Mongoose 6+
    res.status(200).json({ message: 'Post removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Like a post
// @route   POST /api/posts/:id/like
// @access  Private
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const userId = req.user._id.toString();
    if (!post.likes.map(id => id.toString()).includes(userId)) {
      post.likes.push(req.user._id);
      await post.save();
    }
    res.status(200).json({ likes: post.likes.length });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Unlike a post
// @route   POST /api/posts/:id/unlike
// @access  Private
exports.unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const userId = req.user._id.toString();
    post.likes = post.likes.filter(id => id.toString() !== userId);
    await post.save();
    res.status(200).json({ likes: post.likes.length });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Increment post views
// @route   POST /api/posts/:id/view
// @access  Public
exports.incrementView = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json({ views: post.views });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get analytics for current user's posts
// @route   GET /api/posts/my-analytics
// @access  Private
exports.getMyAnalytics = async (req, res) => {
  try {
    const myPosts = await Post.find({ user: req.user._id }).select('_id views likes');
    const postIds = myPosts.map(p => p._id);
    const commentsCount = await Comment.countDocuments({ post: { $in: postIds } });
    const totalViews = myPosts.reduce((sum, p) => sum + (p.views || 0), 0);
    const totalLikes = myPosts.reduce((sum, p) => sum + (p.likes?.length || 0), 0);
    res.json({ totalViews, totalLikes, totalComments: commentsCount });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};