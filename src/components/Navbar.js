// blog-frontend/src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// Create this CSS file

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">My Blog</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        {user ? (
          <>
            <li><Link to="/create-post">Create Post</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><button onClick={handleLogout}>Logout ({user.name})</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;