import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import PostDetail from './components/pages/PostDetail';
import CreatePost from './components/pages/CreatePost';
import UserDashboardPage from './components/pages/UserDashboardPage';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <AuthProvider> {/* No <Router> here */}
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          
          {/* Protected Routes */}
          <Route path="/create-post" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><UserDashboardPage /></PrivateRoute>} />
        </Routes>
      </main>
    </AuthProvider>
  );
}

export default App;
