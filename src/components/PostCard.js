// blog-frontend/src/components/PostCard.js
import React from 'react';
import { Link } from 'react-router-dom';
// Create this CSS file

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <Link to={`/posts/${post._id}`}>
        <h3>{post.title}</h3>
        {/* If you have an image, display it */}
        {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
        <p>{post.content.substring(0, 150)}...</p> {/* Display a snippet */}
      </Link>
      <div className="post-meta">
        <span>By {post.author ? post.author.name : 'Unknown'}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default PostCard;