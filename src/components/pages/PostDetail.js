import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axiosInstance';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Form fields for editing
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setPost(res.data);

        // Initialize form fields with current post data
        setTitle(res.data.title);
        setCategory(res.data.category);
        setContent(res.data.content);
      } catch (err) {
        setError('Could not fetch post');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const isOwner = user && post?.user && post.user._id === user._id;

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await API.delete(`/posts/${id}`);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedPost = { title, category, content };
      const res = await API.put(`/posts/${id}`, updatedPost);
      setPost(res.data);
      setIsEditing(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div className="post-detail">
      {post.image && (
        <img
          src={`http://localhost:5000/uploads/${post.image}`}
          alt={post.title}
          style={{ width: '100%', height: '300px', objectFit: 'cover' }}
        />
      )}

      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <div>
            <label>Title:</label><br />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Category:</label><br />
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Content:</label><br />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              required
            />
          </div>

          <button type="submit">Save</button>
          <button type="button" onClick={handleEditToggle} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h2>{post.title}</h2>
          <p><strong>Category:</strong> {post.category}</p>
          <p>{post.content}</p>
          <p><em>By {post.user?.username || 'Unknown'}</em></p>

          {isOwner && (
            <div className="owner-actions" style={{ marginTop: '20px' }}>
              <button onClick={handleEditToggle}>Edit</button>
              <button onClick={handleDelete} style={{ color: 'red', marginLeft: '10px' }}>
                Delete
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostDetail;
