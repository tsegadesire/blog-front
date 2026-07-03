import React, { useEffect, useMemo, useState } from 'react';
import * as adminService from '../../api/adminService';

export default function PostsModeration() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({ user: '', category: '', date: '' });
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    return posts.filter(p => {
      const matchesQ = q ? (p.title?.toLowerCase().includes(q.toLowerCase()) || p.author?.name?.toLowerCase().includes(q.toLowerCase())) : true;
      const byUser = filters.user ? (p.author?._id === filters.user || p.author?.name === filters.user) : true;
      const byCat = filters.category ? (p.category === filters.category) : true;
      const byDate = filters.date ? (new Date(p.createdAt).toDateString() === new Date(filters.date).toDateString()) : true;
      return matchesQ && byUser && byCat && byDate;
    });
  }, [posts, q, filters]);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await adminService.listPosts();
      setPosts(data);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await adminService.deletePost(id);
      await load();
    } catch (e) {
      alert(e.response?.data?.message || 'Failed to delete post');
    }
  };

  if (loading) return <div className="posts-moderation loading">Loading posts...</div>;
  if (error) return <div className="posts-moderation error">{error}</div>;

  return (
    <>
      <style>{`
/* Root */
.posts-moderation { max-width: 1100px; margin: 24px auto; padding: 24px clamp(16px,3vw,32px); background: #ffffff; border: 1px solid #eef2f7; border-radius: 16px; box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(2,132,199,0.08); }
.posts-moderation h1 { margin: 0 0 16px; font-size: 1.875rem; color: #0f172a; }

/* Filters */
.posts-filters { display: flex; gap: 12px; margin-bottom: 12px; flex-wrap: wrap; }
.posts-filters input { border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 12px; font-size: 0.95rem; outline: none; transition: border-color 160ms ease, box-shadow 160ms ease; }
.posts-filters input:focus { border-color: #0ea5e9; box-shadow: 0 0 0 3px rgba(14,165,233,0.15); }

/* Table */
.posts-table { width: 100%; border-collapse: collapse; overflow: hidden; border-radius: 12px; border: 1px solid #e2e8f0; }
.posts-table th, .posts-table td { text-align: left; padding: 10px 12px; }
.posts-table thead th { background: #f8fafc; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #0f172a; }
.posts-table tbody tr { border-bottom: 1px solid #e2e8f0; transition: background-color 120ms ease; }
.posts-table tbody tr:hover { background: #f1f5f9; }
.posts-table .action-btn { border: 1px solid #e2e8f0; border-radius: 10px; padding: 8px 10px; background: #ffffff; font-weight: 600; color: #b91c1c; cursor: pointer; transition: background-color 140ms ease, transform 140ms ease, box-shadow 140ms ease; }
.posts-table .action-btn:hover { background: #fef2f2; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(185,28,28,0.15); }

/* States */
.posts-moderation.loading, .posts-moderation.error { max-width: 1100px; margin: 24px auto; padding: 14px 16px; border-radius: 12px; }
.posts-moderation.error { color: #b91c1c; background: #fef2f2; border: 1px solid #fecaca; font-weight: 600; }
.posts-moderation.loading { background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 37%, #f1f5f9 63%); background-size: 400% 100%; animation: shimmer 1.2s ease-in-out infinite; }
@keyframes shimmer { 0% { background-position: 100% 0; } 100% { background-position: 0 0; } }
      `}</style>
      <div className="posts-moderation">
        <h1>Posts Moderation</h1>
        <div className="posts-filters">
          <input placeholder="Search title/author" value={q} onChange={(e)=>setQ(e.target.value)} />
          <input placeholder="User ID or name" value={filters.user} onChange={(e)=>setFilters(prev=>({...prev, user: e.target.value}))} />
          <input placeholder="Category" value={filters.category} onChange={(e)=>setFilters(prev=>({...prev, category: e.target.value}))} />
          <input type="date" value={filters.date} onChange={(e)=>setFilters(prev=>({...prev, date: e.target.value}))} />
        </div>
        <table className="posts-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>{p.author?.name || p.author?.username || '—'}</td>
                <td>{p.category || '—'}</td>
                <td>{new Date(p.createdAt).toLocaleString()}</td>
                <td>
                  <button className="action-btn" onClick={()=>onDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
