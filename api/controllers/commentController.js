const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.getCommentsForPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username profilePic')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;

    const newComment = new Comment({
      post: postId,
      text,
      author: req.user._id,
    });

    await newComment.save();

    const populatedComment = await Comment.findById(newComment._id)
      .populate('author', 'username profilePic');

    res.status(201).json(populatedComment);
  } catch (err) {
    console.error('Add Comment Error:', err.message);
    res.status(500).json({ message: 'Failed to add comment', error: err.message });
  }
};