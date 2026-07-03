import React, { useEffect, useState } from 'react';
import * as adminService from '../../api/adminService';

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await adminService.getAuditLogs();
        setLogs(data);
      } catch (e) {
        setError(e.response?.data?.message || 'Failed to load logs');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="audit-logs loading">Loading logs...</div>;
  if (error) return <div className="audit-logs error">{error}</div>;

  return (
    <>
      <style>{`
/* Root */
.audit-logs { max-width: 1100px; margin: 24px auto; padding: 24px clamp(16px,3vw,32px); background: #ffffff; border: 1px solid #eef2f7; border-radius: 16px; box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(2,132,199,0.08); }
.audit-logs h1 { margin: 0 0 16px; font-size: 1.875rem; color: #0f172a; }

/* List */
.audit-logs ul { list-style: none; padding: 0; margin: 0; }
.audit-logs li { display: flex; gap: 8px; align-items: baseline; padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 10px; background: #ffffff; margin-bottom: 10px; transition: border-color 160ms ease, box-shadow 160ms ease; }
.audit-logs li:hover { border-color: rgba(14,165,233,0.4); box-shadow: 0 6px 18px rgba(14,165,233,0.12); }
.audit-logs li span:first-child { white-space: nowrap; color: #475569; font-size: 0.9rem; }
.audit-logs strong { color: #0f172a; }

/* States */
.audit-logs.loading, .audit-logs.error { max-width: 1100px; margin: 24px auto; padding: 14px 16px; border-radius: 12px; }
.audit-logs.error { color: #b91c1c; background: #fef2f2; border: 1px solid #fecaca; font-weight: 600; }
.audit-logs.loading { background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 37%, #f1f5f9 63%); background-size: 400% 100%; animation: shimmer 1.2s ease-in-out infinite; }
@keyframes shimmer { 0% { background-position: 100% 0; } 100% { background-position: 0 0; } }
      `}</style>
      <div className="audit-logs">
        <h1>Audit Logs</h1>
        {logs.length === 0 ? (
          <div>No logs</div>
        ) : (
          <ul>
            {logs.map(l => (
              <li key={l._id || l.id}>
                <span>{new Date(l.createdAt).toLocaleString()} - </span>
                <strong>{l.actor?.name || l.actor?.email || 'System'}:</strong> {l.action} {l.target || ''}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
