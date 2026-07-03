import React, { useState } from 'react';
import { FileText, Edit, Zap, Tag, Image, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axiosInstance';

// The App component serves as the main entry point for the single-file immersive.
export default function App() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const navigate = useNavigate();

  // Mocking the backend submission process for a standalone component
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!title || !summary || !content) {
      setMessage('❌ Please fill in the title, summary, and content.');
      return;
    }

    try {
      setIsPublishing(true);
      setMessage('Publishing post...');

      const formData = new FormData();
      formData.append('title', title);
      formData.append('summary', summary);
      formData.append('content', content);
      formData.append('category', category);
      if (image) formData.append('image', image);

      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      const token = storedToken || parsedUser?.token;

      if (!token) {
        setMessage('You must be logged in to create a post.');
        setIsPublishing(false);
        return;
      }

      const res = await API.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('✅ Your post has been successfully published to Techethio Blog!');

      // Optional: clear fields (we're navigating away immediately anyway)
      setTitle('');
      setSummary('');
      setContent('');
      setCategory('');
      setImage(null);

      navigate('/');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to create post');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen  flex items-start lg:items-center justify-center font-inter p-4 sm:p-8">
      <div className="max-w-4xl w-full">
        
        {/* Form Card - Styled with bg-blue-100 for contrast */}
        <div className="">
          
          <h2 className="text-3xl font-extrabold text-blue-800 text-center mb-8 flex items-center justify-center space-x-2">
            <Edit className="w-8 h-8 text-blue-600" />
            <span>Publish a New Insight</span>
          </h2>

          {/* Status Message Display */}
          {message && (
            <p className={`p-3 mb-6 rounded-lg text-center font-medium ${
              message.startsWith('✅') ? 'bg-green-100 text-green-700 border-green-300' : 'bg-red-100 text-red-700 border-red-300'
            } border transition duration-300`}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
            
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                <FileText className="w-4 h-4 mr-1 text-blue-500" />
                Post Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="A catchy title for your article"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-150"
                required
              />
            </div>
            
            {/* Summary Input */}
            <div>
              <label htmlFor="summary" className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                <Zap className="w-4 h-4 mr-1 text-blue-500" />
                Short Summary
              </label>
              <input
                type="text"
                id="summary"
                placeholder="A brief teaser for the reader"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-150"
                required
              />
            </div>

            {/* Content Textarea */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                <Edit className="w-4 h-4 mr-1 text-blue-500" />
                Full Content
              </label>
              <textarea
                id="content"
                rows="8"
                placeholder="Write your detailed article content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-150 resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Category Input */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                  <Tag className="w-4 h-4 mr-1 text-blue-500" />
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  placeholder="e.g., Tech, Culture, Business"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-150"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                  <Image className="w-4 h-4 mr-1 text-blue-500" />
                  Cover Image
                </label>
                <input
                  type="file"
                  id="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full block text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-200 file:text-blue-700
                    hover:file:bg-blue-300 transition duration-150 border-slate-300 rounded-lg"
                />
                {image && (
                  <p className="text-xs text-slate-500 mt-1 truncate">File selected: {image.name}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button 
                type="submit" 
                disabled={isPublishing}
                className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 disabled:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 flex items-center justify-center transform hover:scale-[1.005]"
              >
                {isPublishing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publishing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Publish to Techethio
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
