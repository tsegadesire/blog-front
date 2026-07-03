import  { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axiosInstance';
import CommentSection from '../pages/CommentSection';
import { likePost as likePostApi, unlikePost as unlikePostApi, incrementView as incrementViewApi } from '../../api/postService';


const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);

  // Form fields for editing
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setPost(res.data);
        setLikesCount(res.data.likes?.length || 0);
        if (user && res.data.likes) {
          setLiked(res.data.likes.some((u) => (u._id || u) === user._id));
        } else {
          setLiked(false);
        }

        // Initialize form fields with current post data
        setTitle(res.data.title);
        setCategory(res.data.category);
        setContent(res.data.content);
      } catch (err) {
        setError('Could not fetch post');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, user]);

  // Increment views once on load
  useEffect(() => {
    if (id) {
      incrementViewApi(id).catch(() => {});
    }
  }, [id]);

  const isOwner = user && post?.user && post.user._id === user._id;

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await API.delete(`/posts/${id}`);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedPost = { title, category, content };
      const res = await API.put(`/posts/${id}`, updatedPost);
      setPost(res.data);
      setIsEditing(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed');
    }
  };

  const userToken = localStorage.getItem('token');

  const handleLikeToggle = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      if (liked) {
        const res = await unlikePostApi(id);
        setLiked(false);
        setLikesCount(res.likes);
      } else {
        const res = await likePostApi(id);
        setLiked(true);
        setLikesCount(res.likes);
      }
    } catch (e) {
      // no-op UI error
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: post?.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard');
      }
    } catch (e) {}
  };

  if (loading) return <p className="text-center py-10 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-600 font-medium">{error}</p>;
  if (!post) return <p className="text-center py-10 text-gray-600">Post not found</p>;

  return (
    <>
      <style>{`
        .post-detail { max-width: 64rem; margin-left: auto; margin-right: auto; padding: 1.5rem; }
        @media (min-width: 640px) { .post-detail { padding-left: 1.5rem; padding-right: 1.5rem; } }
        @media (min-width: 1024px) { .post-detail { padding-left: 2rem; padding-right: 2rem; } }
        .post-detail .hero { overflow: hidden; border-radius: 0.75rem; box-shadow: 0 10px 25px rgba(2,132,199,0.12); }
        .post-detail header h2 { letter-spacing: -0.01em; }
        .post-detail .owner-actions button { transition: transform 140ms ease, box-shadow 140ms ease; }
        .post-detail .owner-actions button:hover { transform: translateY(-1px); box-shadow: 0 8px 18px rgba(2,132,199,0.15); }
      `}</style>
      <div className="post-detail max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {post.image && (
        <div className="hero mb-6">
          <img
            src={`http://localhost:5000/uploads/${post.image}`}
            alt={post.title}
            className="w-full h-64 object-cover"
          />
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <button type="submit" className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Save</button>
            <button type="button" onClick={handleEditToggle} className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50">Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <header className="mb-4">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">{post.title}</h2>
            <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
              <span>By {post.user?.username || 'Unknown'}</span>
              <span>•</span>
              <span className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-gray-700">{post.category}</span>
            </div>
          </header>

          <article className="prose max-w-none text-gray-800 whitespace-pre-line">
            {post.content}
          </article>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button onClick={handleLikeToggle} className="rounded-md border border-gray-300 px-3 py-1.5 text-gray-700 hover:bg-gray-50">{liked ? 'Unlike' : 'Like'}</button>
            <span className="text-sm text-gray-600">{likesCount} likes</span>
            <button onClick={handleShare} className="rounded-md bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700">Share</button>
          </div>

          {isOwner && (
            <div className="owner-actions mt-6 flex items-center gap-3">
              <button onClick={handleEditToggle} className="rounded-md border border-gray-300 px-3 py-1.5 text-gray-700 hover:bg-gray-50">Edit</button>
              <button onClick={handleDelete} className="rounded-md bg-red-600 px-3 py-1.5 text-white hover:bg-red-700">Delete</button>
            </div>
          )}
        </>
      )}
   <div className="mt-8">
     {post && post._id && <CommentSection postId={post._id} token={userToken} />}
   </div>



      </div>
    </>
  );
};

export default PostDetail;
