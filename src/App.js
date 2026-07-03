
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import PostDetail from './components/pages/PostDetail';
import CreatePost from './components/pages/CreatePost';
import UserDashboardPage from './components/pages/UserDashboardPage';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

import UserProfile from './components/pages/UserProfile';
import AdminOverview from './components/admin/AdminOverview';
import UsersManagement from './components/admin/UsersManagement';
import PostsModeration from './components/admin/PostsModeration';
import AdminsManagement from './components/admin/AdminsManagement';
import AuditLogs from './components/admin/AuditLogs';
import AdminLayout from './components/admin/AdminLayout';

function App() {
  return (
    <AuthProvider> {/* No <Router> here */}
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Protected Routes */}
          <Route path="/create-post" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><UserDashboardPage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={<PrivateRoute adminOnly><AdminLayout /></PrivateRoute>}
          >
            <Route index element={<AdminOverview />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="posts" element={<PostsModeration />} />
            <Route path="admins" element={<AdminsManagement />} />
            <Route path="audit" element={<AuditLogs />} />
          </Route>
        </Routes>
      </main>
    </AuthProvider>
  );
}

export default App;
