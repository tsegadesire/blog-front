// blog-frontend/src/api/authService.js
import API from './axiosInstance';

const register = async (name, email, password) => {
  const response = await API.post('/auth/register', { name, email, password });
  return response.data; // Assuming your backend returns user data + token
};

const login = async (email, password) => {
  const response = await API.post('/auth/login', { email, password });
  return response.data; // Assuming your backend returns user data + token
};

const logout = () => {
  // If you have a backend logout endpoint that invalidates tokens
  // await API.post('/users/logout');
  // For now, just clear client-side storage
};

// Admin: user management
const getUsers = async () => {
  const response = await API.get('/users');
  return response.data;
};

const getUserById = async (id) => {
  const response = await API.get(`/users/${id}`);
  return response.data;
};

const deleteUser = async (id) => {
  const response = await API.delete(`/users/${id}`);
  return response.data;
};

export { register, login, logout, getUsers, getUserById, deleteUser };