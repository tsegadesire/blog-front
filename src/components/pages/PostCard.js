import React from 'react';

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      {post.image && (
        <img
          src={`http://localhost:5000/uploads/${post.image}`}
          alt={post.title}
          className="post-image"
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />
      )}
      <h2>{post.title}</h2>
      <p><strong>Category:</strong> {post.category}</p>
      <p>{post.summary}</p>
      <small>By: {post.user?.username || 'Unknown'}</small>
    </div>
  );
};

export default PostCard;
