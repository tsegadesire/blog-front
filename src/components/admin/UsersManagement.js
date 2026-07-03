import React, { useEffect, useMemo, useState } from 'react';
import * as adminService from '../../api/adminService';

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [q, setQ] = useState('');
  const [onlyInactive, setOnlyInactive] = useState(false);

  const filtered = useMemo(() => {
    return users.filter(u => {
      const matches = q ? (u.name?.toLowerCase().includes(q.toLowerCase()) || u.email?.toLowerCase().includes(q.toLowerCase()) || u.username?.toLowerCase().includes(q.toLowerCase())) : true;
      const statusOk = onlyInactive ? (u.active === false) : true;
      return matches && statusOk;
    });
  }, [users, q, onlyInactive]);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await adminService.listUsers();
      setUsers(data);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onDeactivate = async (id) => {
    if (!window.confirm('Deactivate this user?')) return;
    try {
      await adminService.deactivateUser(id);
      await load();
    } catch (e) {
      alert(e.response?.data?.message || 'Failed to deactivate user');
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm('Permanently delete this user?')) return;
    try {
      await adminService.deleteUser(id);
      await load();
    } catch (e) {
      alert(e.response?.data?.message || 'Failed to delete user');
    }
  };

  if (loading) return <div className="users-management loading">Loading users...</div>;
  if (error) return <div className="users-management error">{error}</div>;

  return (
    <>
      <style>{`
/* Root */
.users-management { max-width: 1100px; margin: 24px auto; padding: 24px clamp(16px,3vw,32px); background: #ffffff; border: 1px solid #eef2f7; border-radius: 16px; box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(2,132,199,0.08); }
.users-management h1 { margin: 0 0 16px; font-size: 1.875rem; color: #0f172a; }

/* Controls */
.users-controls { display: flex; gap: 12px; margin-bottom: 12px; align-items: center; flex-wrap: wrap; }
.users-controls input[type="text"], .users-controls input[placeholder] { flex: 1 1 320px; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 12px; font-size: 0.95rem; outline: none; transition: border-color 160ms ease, box-shadow 160ms ease; }
.users-controls input[type="text"]:focus, .users-controls input[placeholder]:focus { border-color: #0ea5e9; box-shadow: 0 0 0 3px rgba(14,165,233,0.15); }
.users-controls label { display: flex; align-items: center; gap: 6px; color: #0f172a; }

/* Table */
.users-table { width: 100%; border-collapse: collapse; overflow: hidden; border-radius: 12px; border: 1px solid #e2e8f0; }
.users-table th, .users-table td { text-align: left; padding: 10px 12px; }
.users-table thead th { background: #f8fafc; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #0f172a; }
.users-table tbody tr { border-bottom: 1px solid #e2e8f0; transition: background-color 120ms ease; }
.users-table tbody tr:hover { background: #f1f5f9; }
.users-table .actions { display: flex; gap: 8px; }
.users-table .btn { border: 1px solid #e2e8f0; border-radius: 10px; padding: 8px 10px; background: #ffffff; font-weight: 600; cursor: pointer; transition: background-color 140ms ease, transform 140ms ease, box-shadow 140ms ease; }
.users-table .btn:hover { background: #f8fafc; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(2,132,199,0.15); }
.users-table .btn-danger { color: #b91c1c; border-color: #fecaca; }
.users-table .btn:disabled { opacity: 0.5; cursor: not-allowed; }

/* States */
.users-management.loading, .users-management.error { max-width: 1100px; margin: 24px auto; padding: 14px 16px; border-radius: 12px; }
.users-management.error { color: #b91c1c; background: #fef2f2; border: 1px solid #fecaca; font-weight: 600; }
.users-management.loading { background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 37%, #f1f5f9 63%); background-size: 400% 100%; animation: shimmer 1.2s ease-in-out infinite; }
@keyframes shimmer { 0% { background-position: 100% 0; } 100% { background-position: 0 0; } }
      `}</style>
      <div className="users-management">
        <h1>Users</h1>
        <div className="users-controls">
          <input placeholder="Search name/email/username" value={q} onChange={(e)=>setQ(e.target.value)} />
          <label>
            <input type="checkbox" checked={onlyInactive} onChange={(e)=>setOnlyInactive(e.target.checked)} /> Only inactive
          </label>
        </div>
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u._id}>
                <td>{u.name || u.username}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.active === false ? 'Inactive' : 'Active'}</td>
                <td className="actions">
                  <button className="btn" onClick={()=>onDeactivate(u._id)} disabled={u.active === false}>Deactivate</button>
                  <button className="btn btn-danger" onClick={()=>onDelete(u._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
