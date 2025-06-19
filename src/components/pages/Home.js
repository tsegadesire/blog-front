import React, { useEffect, useState } from 'react';
import * as postService from '../../api/postService';
import PostCard from '../PostCard'; // We'll create this

const Home = () => {
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

  if (loading) return <div className="text-center py-10 text-gray-500">Loading posts...</div>;
  if (error) return <div className="text-center py-10 text-red-600 font-semibold">{error}</div>;

  return (
    <div className="home-page max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Latest Blog Posts</h1>
      <div className="posts-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <p className="text-gray-600">No posts available yet. Create one!</p>
        )}
        
      </div>
    </div>
  );
};

export default Home;
