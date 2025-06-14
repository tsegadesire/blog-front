// blog-frontend/src/api/postService.js
import API from './axiosInstance';

const getPosts = async () => {
  const response = await API.get('/posts');
  return response.data;
};

const getPostById = async (id) => {
  const response = await API.get(`/posts/${id}`);
  return response.data;
};
// --- NEW FUNCTION ---
const getUserPosts = async () => {
  // Assuming your backend has an endpoint like /api/posts/my-posts
  // that returns posts owned by the authenticated user.
  // This endpoint would need to be protected by your `protect` middleware on the backend.
  const response = await API.get('/posts/my-posts');
  return response.data;
};

const createPost = async (postData) => {
  const response = await API.post('/posts', postData);
  return response.data;
};

const updatePost = async (id, postData) => {
  const response = await API.put(`/posts/${id}`, postData);
  return response.data;
};

const deletePost = async (id) => {
  const response = await API.delete(`/posts/${id}`);
  return response.data;
};

export { getPosts, getPostById, createPost, updatePost, deletePost,getUserPosts};