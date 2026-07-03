const Comment = require('../models/Comment');

exports.getCommentsForPost = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: 1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const comment = new Comment({
      postId,
      content,
      author: { id: req.user.id, name: req.user.name },
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add comment', error: err.message });
  }
};

exports.addReply = async (req, res) => {
  try {
    const { content } = req.body;
    const { commentId } = req.params;
    const reply = new Comment({
      parentId: commentId,
      content,
      author: { id: req.user.id, name: req.user.name },
    });
    await reply.save();
    res.status(201).json(reply);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add reply', error: err.message });
  }
};

exports.likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    const userId = req.user.id;
    if (comment.likes.includes(userId)) {
      comment.likes.pull(userId);
    } else {
      comment.likes.push(userId);
    }

    await comment.save();
    res.json({ likes: comment.likes.length });
  } catch (err) {
    res.status(500).json({ message: 'Failed to toggle like', error: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    if (comment.author.id.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete comment', error: err.message });
  }
};
