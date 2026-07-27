const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title:    { type: String, required: true },
 summary:   { type: String, required: true },
  content:  { type: String, required: true },
user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',        // Reference your User model
    required: true,     // Usually required since a post belongs to a user
  },
  category: { type: String, required: true },
  image: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  views: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
