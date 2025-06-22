import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommentSection = ({ postId, token }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);

  // 🔁 Fetch comments when component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/posts/${postId}/comments`);
        setComments(res.data);
      } catch (err) {
        console.error('Failed to fetch comments:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  // 📝 Submit new comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      setPosting(true);
     const res = await axios.post(
  `http://localhost:5000/api/posts/${postId}/comments`,  // <-- add slash here
  { text },
  { headers: { Authorization: `Bearer ${token}` } }
);

      setComments([res.data, ...comments]);
      setText('');
    } catch (err) {
      console.error('Failed to post comment:', err.message);
    } finally {
      setPosting(false);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Discussion ({comments.length})
          </h2>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">Your comment</label>
            <textarea
              id="comment"
              rows="4"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={posting}
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900"
          >
            {posting ? 'Posting...' : 'Post comment'}
          </button>
        </form>

        {/* Comments */}
        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading comments...</p>
        ) : (
          comments.map((comment) => (
            <article key={comment._id} className="p-6 text-base bg-white rounded-lg dark:bg-gray-900 mb-4">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                    <img
  className="mr-2 w-6 h-6 rounded-full"
  src={
    comment.author.profilePic
      ? `http://localhost:5000/uploads/profile/${comment.author.profilePic}`
      : '/default.png'
  }
  alt={comment.author.username}
/>

                    {comment.author.username}
                  </p>


                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </footer>
              <p className="text-gray-500 dark:text-gray-400">{comment.text}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default CommentSection;
