// blog-frontend/src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import * as postService from '../../api/postService';
import PostCard from '../PostCard'; // We'll create this

const Home= () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getPosts();
        setPosts(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch posts.');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="home-page">
      <h1>Latest Blog Posts</h1>
      <div className="posts-grid">
        
       {posts.length > 0 ? (
  posts.map((post) => <PostCard key={post._id} post={post} />)
) : (
  <p>No posts available yet. Create one!</p>
)}
      </div>
    </div>
  );
};

export default Home;