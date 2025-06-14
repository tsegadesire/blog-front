// blog-frontend/src/api/axiosInstance.js
import axios from 'axios';

const API = axios.create({
  // Ensure this matches your backend server's URL and port
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // If you plan to send cookies (e.g., for JWT in HttpOnly cookies)
});

// Optional: Add a request interceptor to attach tokens
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user')); // Assuming you store user info with token
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Optional: Add a response interceptor to handle token expiration/401 errors
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Example: If 401 and not a login/register request, try refresh token or logout
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark as retried
      // You'd typically handle refresh token logic here if you have one
      // For now, if 401, maybe redirect to login
      // console.log("Token expired or invalid, redirecting to login...");
      // window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);


export default API;