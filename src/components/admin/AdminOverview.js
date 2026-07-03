import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as adminService from '../../api/adminService';

export default function AdminOverview() {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const [s, a] = await Promise.all([
          adminService.getStats(),
          adminService.getRecentActivity(),
        ]);
        setStats(s);
        setActivity(a);
      } catch (e) {
        setError(e.response?.data?.message || 'Failed to load admin overview');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="admin-overview loading">Loading admin overview...</div>;
  if (error) return <div className="admin-overview error">{error}</div>;

  return (
    <>
      <style>{`
/* Root container */
.admin-overview {
  max-width: 1100px;
  margin: 24px auto;
  padding: 24px clamp(16px, 3vw, 32px);
  background: #ffffff;
  border: 1px solid #eef2f7;
  border-radius: 16px;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(2, 132, 199, 0.08);
}

/* Header */
.admin-overview h1 {
  margin: 0 0 16px;
  font-size: 1.875rem;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: #0f172a;
}

/* Stats grid */
.admin-overview .stats-grid[style],
.admin-overview > div[style*="grid-template-columns"] {
  display: grid !important;
  grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  gap: 16px !important;
  margin: 0 0 8px;
}

.admin-overview .stat-card,
.admin-overview > div[style*="grid-template-columns"] > div {
  background: linear-gradient(180deg, #ffffff, #f8fafc);
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 10px rgba(2, 132, 199, 0.06);
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.admin-overview .stat-card:hover,
.admin-overview > div[style*="grid-template-columns"] > div:hover {
  transform: translateY(-2px);
  border-color: rgba(14, 165, 233, 0.5);
  box-shadow: 0 10px 24px rgba(14, 165, 233, 0.15);
}

.admin-overview .stat-card .label,
.admin-overview > div[style*="grid-template-columns"] > div > div:first-child {
  font-size: 0.85rem;
  color: #0ea5e9;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 6px;
}

.admin-overview .stat-card .value,
.admin-overview > div[style*="grid-template-columns"] > div > div[style*="fontSize"] {
  font-size: 1.5rem !important;
  font-weight: 700 !important;
  color: #0f172a;
}

/* Actions row */
.admin-overview .actions[style],
.admin-overview > div[style*="display: 'flex'"] {
  display: flex !important;
  gap: 12px !important;
  margin-top: 24px !important;
  flex-wrap: wrap;
}

.admin-overview .actions a,
.admin-overview > div[style*="display: 'flex'"] a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(90deg, #0ea5e9, #0284c7);
  box-shadow: 0 2px 10px rgba(14, 165, 233, 0.25), inset 0 -2px 0 rgba(255, 255, 255, 0.15);
  transition: transform 160ms ease, box-shadow 160ms ease, opacity 160ms ease;
}

.admin-overview .actions a:hover,
.admin-overview > div[style*="display: 'flex'"] a:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(2, 132, 199, 0.35), inset 0 -2px 0 rgba(255, 255, 255, 0.2);
}

/* Recent Activity */
.admin-overview h2 {
  margin-top: 28px;
  margin-bottom: 10px;
  font-size: 1.25rem;
  color: #0f172a;
}

.admin-overview ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.admin-overview li {
  display: flex;
  gap: 8px;
  align-items: baseline;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #ffffff;
  margin-bottom: 10px;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}

.admin-overview li:hover {
  border-color: rgba(14, 165, 233, 0.4);
  box-shadow: 0 6px 18px rgba(14, 165, 233, 0.12);
}

.admin-overview li span:first-child {
  white-space: nowrap;
  color: #475569;
  font-size: 0.9rem;
}

/* States */
.admin-overview .error { color: #b91c1c; background: #fef2f2; border: 1px solid #fecaca; padding: 10px 12px; border-radius: 10px; font-weight: 600; }
.admin-overview .loading { background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 37%, #f1f5f9 63%); background-size: 400% 100%; animation: shimmer 1.2s ease-in-out infinite; border-radius: 10px; height: 14px; }

@keyframes shimmer { 0% { background-position: 100% 0; } 100% { background-position: 0 0; } }

/* Links fallback */
.admin-overview a { color: #0284c7; text-decoration: none; transition: color 140ms ease; }
.admin-overview a:hover { color: #0369a1; }
      `}</style>
      <div className="admin-overview">
        <h1>Admin Dashboard</h1>
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 16 }}>
          <div className="stat-card">
            <div className="label">Total Users</div>
            <div className="value">{stats?.users ?? '-'}</div>
          </div>
          <div className="stat-card">
            <div className="label">Total Posts</div>
            <div className="value">{stats?.posts ?? '-'}</div>
          </div>
          <div className="stat-card">
            <div className="label">Admins</div>
            <div className="value">{stats?.admins ?? '-'}</div>
          </div>
          <div className="stat-card">
            <div className="label">Flagged</div>
            <div className="value">{stats?.flagged ?? '-'}</div>
          </div>
        </div>

        <div className="actions" style={{ marginTop: 24, display: 'flex', gap: 12 }}>
          <Link to="/admin/users">Manage Users</Link>
          <Link to="/admin/posts">Moderate Posts</Link>
          <Link to="/admin/admins">Admin Roles</Link>
          <Link to="/admin/audit">Audit Logs</Link>
        </div>

        <h2 style={{ marginTop: 24 }}>Recent Activity</h2>
        {activity?.length === 0 ? (
          <div>No recent activity</div>
        ) : (
          <ul>
            {activity.map((item) => (
              <li key={item._id || item.id}>
                <span>{new Date(item.createdAt).toLocaleString()} - </span>
                <span>{item.message || item.type}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
