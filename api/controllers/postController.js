// blog-backend/controllers/postController.js (Updated)
const Post = require('../models/Post'); // Assuming you have a Post model

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


exports.getUserPosts = async (req, res) => {
  try {
    // req.user is populated by the protect middleware
    const posts = await Post.find({ user: req.user.id }).populate('user', 'username email').sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// --- END NEW CONTROLLER FUNCTION ---

// @desc    Create new post
// @route   POST /api/posts
// @access  Private


exports.createPost = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
  return res.status(401).json({ message: "Unauthorized: No user info found" });
}

    const { title, summary, content, category ,} = req.body;
    
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

    // Ensure the logged-in user is the owner of the post
    if (post.user.toString() !== req.user._id.toString()) {
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

    // Ensure the logged-in user is the owner of the post
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this post' });
    }

    await Post.deleteOne({ _id: req.params.id }); // Mongoose 6+
    res.status(200).json({ message: 'Post removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};