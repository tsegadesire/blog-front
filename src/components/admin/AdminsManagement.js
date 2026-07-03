import React, { useEffect, useState } from 'react';
import * as adminService from '../../api/adminService';

export default function AdminsManagement() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await adminService.listAdmins();
      setAdmins(data);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to load admins');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onPromote = async () => {
    if (!username) return;
    try {
      await adminService.promoteToAdmin(username);
      setUsername('');
      await load();
    } catch (e) {
      alert(e.response?.data?.message || 'Failed to promote');
    }
  };

  const onDemote = async (id) => {
    if (!window.confirm('Demote this admin?')) return;
    try {
      await adminService.demoteAdmin(id);
      await load();
    } catch (e) {
      alert(e.response?.data?.message || 'Failed to demote');
    }
  };

  if (loading) return <div className="admins-management loading">Loading admins...</div>;
  if (error) return <div className="admins-management error">{error}</div>;

  return (
    <>
      <style>{`
/* Root */
.admins-management { max-width: 1000px; margin: 24px auto; padding: 20px; background: #ffffff; border: 1px solid #eef2f7; border-radius: 14px; box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(2,132,199,0.08); }
.admins-management h1 { margin: 0 0 16px; font-size: 1.75rem; color: #0f172a; }

/* Controls */
.admins-controls { display: flex; gap: 8px; margin-bottom: 12px; }
.admins-controls input { flex: 1 1 260px; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 12px; font-size: 0.95rem; outline: none; transition: border-color 160ms ease, box-shadow 160ms ease; }
.admins-controls input:focus { border-color: #0ea5e9; box-shadow: 0 0 0 3px rgba(14,165,233,0.15); }
.admins-controls button { border: 1px solid transparent; border-radius: 10px; padding: 10px 14px; font-weight: 600; background: linear-gradient(90deg,#0ea5e9,#0284c7); color: #fff; cursor: pointer; transition: transform 160ms ease, box-shadow 160ms ease; }
.admins-controls button:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(2,132,199,0.3); }

/* Table */
.admins-table { width: 100%; border-collapse: collapse; overflow: hidden; border-radius: 12px; border: 1px solid #e2e8f0; }
.admins-table th, .admins-table td { text-align: left; padding: 10px 12px; }
.admins-table thead th { background: #f8fafc; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #0f172a; }
.admins-table tbody tr { border-bottom: 1px solid #e2e8f0; transition: background-color 120ms ease; }
.admins-table tbody tr:hover { background: #f1f5f9; }
.admins-table .action-btn { border: 1px solid #e2e8f0; border-radius: 10px; padding: 8px 10px; background: #ffffff; font-weight: 600; cursor: pointer; transition: background-color 140ms ease, transform 140ms ease, box-shadow 140ms ease; }
.admins-table .action-btn:hover { background: #f8fafc; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(2,132,199,0.15); }
.admins-table .action-btn:disabled { opacity: 0.5; cursor: not-allowed; }

/* States */
.admins-management.loading, .admins-management.error { max-width: 1000px; margin: 24px auto; padding: 14px 16px; border-radius: 12px; }
.admins-management.error { color: #b91c1c; background: #fef2f2; border: 1px solid #fecaca; font-weight: 600; }
.admins-management.loading { background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 37%, #f1f5f9 63%); background-size: 400% 100%; animation: shimmer 1.2s ease-in-out infinite; }
@keyframes shimmer { 0% { background-position: 100% 0; } 100% { background-position: 0 0; } }
      `}</style>
      <div className="admins-management">
        <h1>Admin Management</h1>
        <div className="admins-controls">
          <input placeholder="Username to promote" value={username} onChange={(e)=>setUsername(e.target.value)} />
          <button onClick={onPromote}>Promote</button>
        </div>

        <table className="admins-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(a => (
              <tr key={a._id}>
                <td>{a.name || a.username}</td>
                <td>{a.email}</td>
                <td>{a.role}</td>
                <td>
                  <button className="action-btn" onClick={()=>onDemote(a._id)} disabled={a.role !== 'admin' && a.role !== 'superadmin'}>Demote</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
