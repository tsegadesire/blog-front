import React, { useState } from 'react';
import axios from 'axios';
import './CreatePost.css'; // import the CSS file

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !summary || !content) {
      return setMessage('Title, summary and content are required');
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('content', content);
    formData.append('category', category);
    if (image) {
      formData.append('image', image);
    }

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;

      if (!token) {
        setMessage('You must be logged in to create a post.');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/posts', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('Post created successfully!');
      console.log('Created post:', response.data);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to create post');
      console.error(error);
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create Post</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
