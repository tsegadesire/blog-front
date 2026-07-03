import React, { useEffect, useMemo, useState } from 'react';
import { MessageCircle as MessageCircleIcon, Trash as TrashIcon, Heart as HeartIcon, Reply as ReplyIcon } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import API from '../../api/axiosInstance';
import './CommentSection.css';

const placeholderAvatar = 'https://api.dicebear.com/7.x/initials/svg?seed=User&backgroundType=gradientLinear';

const CommentSection = ({ postId }) => {
  const { currentUser, isAdmin } = useAuth();

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [newComment, setNewComment] = useState('');
  const [openReplyFor, setOpenReplyFor] = useState(null); // commentId
  const [replyText, setReplyText] = useState({}); // map by commentId

  const totalCount = useMemo(() => comments.length, [comments]);

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleString(undefined, {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
      });
    } catch { return ''; }
  };

  const author = (c) => c.author || c.user || {};
  const authorId = (c) => author(c)._id || author(c).id;
  const authorName = (c) => author(c).name || author(c).username || 'Unknown';
  const authorPhoto = (c) => author(c).photo || author(c).avatar || author(c).image || placeholderAvatar;

  const normalize = (c) => {
    const likesArr = Array.isArray(c.likes) ? c.likes : [];
    const likesCount = Array.isArray(c.likes) ? c.likes.length : (typeof c.likes === 'number' ? c.likes : 0);
    const liked = currentUser ? likesArr.some((u) => (u?._id || u) === currentUser._id) : false;
    return {
      ...c,
      createdAt: c.createdAt || c.date,
      parentId: c.parentId || c.parent || null,
      likesCount,
      liked,
    };
  };

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      if (!postId) return;
      setLoading(true);
      setError('');
      try {
        const res = await API.get(`/comments/${postId}`);
        if (!ignore) setComments((res.data || []).map(normalize));
      } catch (e) {
        if (!ignore) setError('Failed to load comments');
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    load();
    return () => { ignore = true; };
  }, [postId, currentUser]);

  const canDelete = (c) => currentUser && (isAdmin || currentUser._id === authorId(c));

  const topLevel = comments.filter((c) => !c.parentId);
  const repliesOf = (id) => comments.filter((c) => c.parentId === id);

  const handlePostComment = async (e) => {
    e.preventDefault();
    const content = newComment.trim();
    if (!content) return;
    try {
      const res = await API.post('/comments', { postId, content });
      setComments((prev) => [...prev, normalize(res.data)]);
      setNewComment('');
    } catch (e) {}
  };

  const handlePostReply = async (e, commentId) => {
    e.preventDefault();
    const content = (replyText[commentId] || '').trim();
    if (!content) return;
    try {
      const res = await API.post(`/comments/${commentId}/reply`, { content });
      setComments((prev) => [...prev, normalize(res.data)]);
      setReplyText((m) => ({ ...m, [commentId]: '' }));
      setOpenReplyFor(null);
    } catch (e) {}
  };

  const handleToggleLike = async (id) => {
    try {
      await API.put(`/comments/${id}/like`);
      setComments((prev) => prev.map((c) => {
        if (c._id !== id) return c;
        const liked = !c.liked;
        const likesCount = liked ? c.likesCount + 1 : Math.max(0, c.likesCount - 1);
        return { ...c, liked, likesCount };
      }));
    } catch (e) {}
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/comments/${id}`);
      setComments((prev) => prev.filter((c) => c._id !== id));
    } catch (e) {}
  };

  return (
    <section className="cs-section">
      <h3 className="cs-title">
        <MessageCircleIcon size={20} /> <span>Comments ({totalCount})</span>
      </h3>

      {currentUser ? (
        <form onSubmit={handlePostComment} className="cs-form">
          <textarea
            className="cs-textarea"
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <button type="submit" className="cs-btn cs-btn-primary">Post Comment</button>
        </form>
      ) : (
        <div className="cs-login">
          Please log in to leave a comment. <a href="/login">Login</a>
        </div>
      )}

      {loading && <div className="cs-loading">Loading comments...</div>}
      {error && <div className="cs-error">{error}</div>}

      <div className="cs-list">
        {topLevel.map((c) => (
          <article key={c._id} className="cs-card">
            <header className="cs-header">
              <img src={authorPhoto(c)} alt={authorName(c)} className="cs-avatar" />
              <div className="cs-meta">
                <div className="cs-author">{authorName(c)}</div>
                <div className="cs-date">{formatDate(c.createdAt)}</div>
              </div>
              {canDelete(c) && (
                <button className="cs-icon cs-delete" onClick={() => handleDelete(c._id)} aria-label="Delete">
                  <TrashIcon size={18} />
                </button>
              )}
            </header>
            <p className="cs-content">{c.content}</p>
            <div className="cs-actions">
              {currentUser && (
                <button
                  className={`cs-icon cs-like ${c.liked ? 'liked' : ''}`}
                  onClick={() => handleToggleLike(c._id)}
                  aria-pressed={c.liked}
                >
                  <HeartIcon size={18} /> <span>{c.likesCount || 0}</span>
                </button>
              )}
              {currentUser && (
                <button
                  className="cs-icon cs-reply"
                  onClick={() => setOpenReplyFor(openReplyFor === c._id ? null : c._id)}
                >
                  <ReplyIcon size={18} /> Reply
                </button>
              )}
            </div>

            {openReplyFor === c._id && currentUser && (
              <form onSubmit={(e) => handlePostReply(e, c._id)} className="cs-reply-form">
                <textarea
                  className="cs-textarea"
                  rows={2}
                  value={replyText[c._id] || ''}
                  onChange={(e) => setReplyText((m) => ({ ...m, [c._id]: e.target.value }))}
                  placeholder="Write a reply..."
                />
                <button type="submit" className="cs-btn cs-btn-primary">Reply</button>
              </form>
            )}

            {repliesOf(c._id).length > 0 && (
              <div className="cs-replies">
                {repliesOf(c._id).map((r) => (
                  <article key={r._id} className="cs-card cs-reply-card">
                    <header className="cs-header">
                      <img src={authorPhoto(r)} alt={authorName(r)} className="cs-avatar" />
                      <div className="cs-meta">
                        <div className="cs-author">{authorName(r)}</div>
                        <div className="cs-date">{formatDate(r.createdAt)}</div>
                      </div>
                      {canDelete(r) && (
                        <button className="cs-icon cs-delete" onClick={() => handleDelete(r._id)} aria-label="Delete reply">
                          <TrashIcon size={18} />
                        </button>
                      )}
                    </header>
                    <p className="cs-content">{r.content}</p>
                    <div className="cs-actions">
                      {currentUser && (
                        <button
                          className={`cs-icon cs-like ${r.liked ? 'liked' : ''}`}
                          onClick={() => handleToggleLike(r._id)}
                          aria-pressed={r.liked}
                        >
                          <HeartIcon size={18} /> <span>{r.likesCount || 0}</span>
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default CommentSection;
