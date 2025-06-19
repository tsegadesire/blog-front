// blog-frontend/src/components/PostCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  // Construct image URL if needed
  const imageUrl = post.imageUrl
    ? post.imageUrl
    : post.image
    ? `http://localhost:5000/uploads/${post.image}`
    : null;

  return (
    <div className="post-card">
      <Link to={`/posts/${post._id}`}>
        <h3>{post.title}</h3>

        {/* Display image if available */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={post.title}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
        )}

        {/* Post snippet */}
        <p>{post.content?.substring(0, 150)}...</p>
      </Link>

      {/* Post metadata */}
      <div className="post-meta">
        <span>By {post.author?.name || post.user?.username || 'Unknown'}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default PostCard;
