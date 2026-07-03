import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-blue-100 border-b border-gray-200">
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-3 no-underline">
          <img src="/techethio-logo.png" alt="TechEthio logo" className="h-8 w-auto" />
          
        </Link>
      </div>
      <ul className="flex items-center gap-4 m-0 p-0 list-none">
        <li>
          <Link to="/" className="text-gray-800 font-medium hover:text-blue-600">Home</Link>
        </li>
        <li>
          <Link to="/about" className="text-gray-800 font-medium hover:text-blue-600">About</Link>
        </li>
        <li>
          <Link to="/contact" className="text-gray-800 font-medium hover:text-blue-600">Contact</Link>
        </li>

        {user ? (
          <>
            <li>
              <Link to="/create-post" className="text-gray-800 font-medium hover:text-blue-600">New Post</Link>
            </li>
            <li>
              <Link to="/dashboard" className="text-gray-800 font-medium hover:text-blue-600"> Panel</Link>
            </li>
            {(user.role === 'admin' || user.role === 'superadmin') && (
              <li>
                <Link to="/admin" className="text-gray-800 font-medium hover:text-blue-600">Admin</Link>
              </li>
            )}
            <li>
              <button onClick={handleLogout} className="text-red-600 font-bold hover:text-red-700">
                Logout <span className="italic ml-1">({user.name})</span>
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="text-gray-800 font-medium hover:text-blue-600">Login</Link>
            </li>
            <li>
              <Link to="/register" className="text-gray-800 font-medium hover:text-blue-600">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
