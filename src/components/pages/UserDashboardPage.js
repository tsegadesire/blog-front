// blog-frontend/src/pages/UserDashboardPage.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import * as postService from '../../api/postService'; // Assuming you have a function to fetch user's posts
import PostCard from '../../components/PostCard'; // Re-use the PostCard component
import { Link } from 'react-router-dom'// Create this CSS file for styling

const UserDashboardPage = () => {
  const { user, loading: authLoading } = useAuth(); // Get user from context
  const [userPosts, setUserPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user) { // If user is not logged in (should be caught by PrivateRoute, but good check)
        setLoadingPosts(false);
        return;
      }

      try {
        // Assuming you have a service function to get posts by the authenticated user
        // You might need to add a new function to postService.js like getUserPosts
        const posts = await postService.getUserPosts(); // This function needs to be created/updated
        setUserPosts(posts);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load your posts.');
        console.error('Error fetching user posts:', err);
      } finally {
        setLoadingPosts(false);
      }
    };

    if (!authLoading) { // Only fetch posts if auth loading is complete
      fetchUserPosts();
    }
  }, [user, authLoading]); // Re-run when user or authLoading state changes

  if (authLoading) {
    return <div>Loading user data...</div>;
  }

  if (!user) {
    // This case should ideally be handled by PrivateRoute redirecting to login,
    // but a fallback message is good.
    return <div>Please log in to view your dashboard.</div>;
  }

  return (
    <div className="user-dashboard-page">
      <h1>Welcome, {user.name}!</h1> {/* Display user's name */}
      <p>Your email: {user.email}</p>
  <Link to="/profile">Profile</Link>
      <div className="dashboard-actions">
        <Link to="/create-post" className="btn btn-primary">Create New Post</Link>
        {/* Add more actions here, e.g., <Link to="/edit-profile">Edit Profile</Link> */}
      </div>

      <hr />

      <h2>Your Posts</h2>
      {loadingPosts ? (
        <div>Loading your posts...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : userPosts.length === 0 ? (
        <p>You haven't created any posts yet. <Link to="/create-post">Start writing!</Link></p>
      ) : (
        <div className="posts-grid">
          {userPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboardPage;