// blog-frontend/src/api/postService.js
import API from './axiosInstance';

// Helper function to get token from localStorage
const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user')); // adjust based on how you store user
  return {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };
};

const getPosts = async () => {
  const response = await API.get('/posts');
  return response.data;
};

const getPostById = async (id) => {
  const response = await API.get(`/posts/${id}`);
  return response.data;
};

const getUserPosts = async () => {
  const response = await API.get('/posts/my-posts', getAuthHeader());
  return response.data;
};

const createPost = async (postData) => {
  const response = await API.post('/posts', postData, {
    ...getAuthHeader(),
    headers: {
      ...getAuthHeader().headers,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const updatePost = async (id, postData) => {
  const response = await API.put(`/posts/${id}`, postData, getAuthHeader());
  return response.data;
};

const deletePost = async (id) => {
  const response = await API.delete(`/posts/${id}`, getAuthHeader());
  return response.data;
};

// Reactions & Views
const likePost = async (id) => {
  const response = await API.post(`/posts/${id}/like`, {}, getAuthHeader());
  return response.data; // { likes }
};

const unlikePost = async (id) => {
  const response = await API.post(`/posts/${id}/unlike`, {}, getAuthHeader());
  return response.data; // { likes }
};

const incrementView = async (id) => {
  const response = await API.post(`/posts/${id}/view`);
  return response.data; // { views }
};

// Analytics
const getMyAnalytics = async () => {
  const response = await API.get('/posts/my-analytics', getAuthHeader());
  return response.data; // { totalViews, totalLikes, totalComments }
};

export {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getUserPosts,
  likePost,
  unlikePost,
  incrementView,
  getMyAnalytics,
};
