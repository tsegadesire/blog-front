// blog-frontend/src/api/uploadService.js
import API from './axiosInstance';

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file); // 'file' matches the `upload.single('file')` in your backend

  const response = await API.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Important for file uploads
    },
  });
  return response.data;
};

export { uploadFile };