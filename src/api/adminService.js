// src/api/adminService.js
import API from './axiosInstance';

// Dashboard stats and activity
export const getStats = async () => {
  const { data } = await API.get('/admin/stats');
  return data; // { users, posts, admins, flagged }
};

export const getRecentActivity = async () => {
  const { data } = await API.get('/admin/activity');
  return data; // [{type, message, createdAt}]
};

// Users
export const listUsers = async (query = {}) => {
  const { data } = await API.get('/admin/users', { params: query });
  return data; // [{_id, name, username, email, role, active}]
};

export const getUser = async (id) => {
  const { data } = await API.get(`/admin/users/${id}`);
  return data;
};

export const updateUser = async (id, payload) => {
  const { data } = await API.put(`/admin/users/${id}`, payload);
  return data;
};

export const deactivateUser = async (id) => {
  const { data } = await API.patch(`/admin/users/${id}/deactivate`);
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await API.delete(`/admin/users/${id}`);
  return data;
};

// Posts
export const listPosts = async (filters = {}) => {
  const { data } = await API.get('/admin/posts', { params: filters });
  return data; // [{_id, title, author, category, createdAt, flagged}]
};

export const deletePost = async (id) => {
  const { data } = await API.delete(`/admin/posts/${id}`);
  return data;
};

// Admin roles
export const listAdmins = async () => {
  const { data } = await API.get('/admin/admins');
  return data; // [{_id, name, email, role}]
};

export const promoteToAdmin = async (userId) => {
  const { data } = await API.post(`/admin/admins/${userId}/promote`);
  return data;
};

export const demoteAdmin = async (userId) => {
  const { data } = await API.post(`/admin/admins/${userId}/demote`);
  return data;
};

// Audit logs (optional)
export const getAuditLogs = async (params = {}) => {
  const { data } = await API.get('/admin/audit', { params });
  return data; // [{_id, actor, action, target, createdAt}]
};
