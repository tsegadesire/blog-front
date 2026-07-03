import React from 'react';
import { Link } from 'react-router-dom';
import './PostCard.css'; // Import the CSS file

const PostCard = ({ post, searchTerm = '' }) => {
  const imageUrl = post.imageUrl
    ? post.imageUrl
    : post.image
    ? `http://localhost:5000/uploads/${post.image}`
    : null;

  const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const highlight = (text, term) => {
    const t = (text || '').toString();
    const q = (term || '').trim();
    if (!q) return t;
    try {
      const re = new RegExp(`(${escapeRegExp(q)})`, 'ig');
      const parts = t.split(re);
      return parts.map((part, idx) =>
        re.test(part) ? (
          <mark key={idx} className="bg-yellow-200 px-0.5 rounded">{part}</mark>
        ) : (
          <span key={idx}>{part}</span>
        )
      );
    } catch {
      return t;
    }
  };

  return (
    <article className="post-card">
      <Link to={`/posts/${post._id}`} className="post-link">
        {imageUrl && (
          <img src={imageUrl} alt={post.title} className="post-image" />
        )}
        <div className="post-content">
          <h3 className="post-title">{highlight(post.title, searchTerm)}</h3>
          <p className="post-excerpt">
            {highlight(`${(post.content || '').substring(0, 150)}...`, searchTerm)}
          </p>
          <div className="post-meta">
            <span className="post-author">
              By {highlight(post.author?.name || post.user?.username || 'Unknown', searchTerm)}
            </span>
            <span className="post-date">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default PostCard;
