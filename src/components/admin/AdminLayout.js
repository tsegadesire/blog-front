import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <>
      <style>{`
/* Container */
.admin-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 0;
  min-height: calc(100vh - 64px);
  background: #f8fafc; /* slate-50 */
}

/* Sidebar */
.admin-sidebar {
  position: sticky;
  top: 0;
  align-self: start;
  height: 100vh;
  padding: 20px 16px;
  background: linear-gradient(180deg, #0b2e63 0%,rgb(243, 243, 243) 100%);
  color: #e2e8f0; /* slate-200 */
  box-shadow: inset -1px 0 0 rgba(255,255,255,0.1), 0 10px 30px rgba(2, 132, 199, 0.15);
}

.admin-sidebar h3 {
  margin: 0 0 16px;
  font-size: 1.1rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #c7d2fe; /* indigo-200 */
}

/* Nav */
.admin-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}

/* Links */
.admin-link {
  display: block;
  padding: 10px 12px;
  border-radius: 10px;
  color: #e2e8f0; /* slate-200 */
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.01em;
  border: 1px solid transparent;
  background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
  transition:
    background-color 160ms ease,
    color 160ms ease,
    border-color 160ms ease,
    transform 160ms ease,
    box-shadow 160ms ease;
}

.admin-link:hover {
  transform: translateY(-1px);
  color: #ffffff;
  border-color: rgba(255,255,255,0.25);
  box-shadow: 0 8px 20px rgba(30, 64, 175, 0.25);
}

/* Active link */
.admin-link.active {
  color: #0b2e63;
  background: #ffffff;
  border-color: #bfdbfe; /* blue-200 */
  box-shadow:
    0 6px 18px rgba(59, 130, 246, 0.25),
    inset 0 -2px 0 rgba(14,165,233,0.18);
}

/* Content area */
.admin-content {
  padding: 24px clamp(16px, 3vw, 32px);
  background: #ffffff;
  border-left: 1px solid #e5e7eb; /* gray-200 */
}

/* Responsive */
@media (max-width: 1024px) {
  .admin-layout {
    grid-template-columns: 220px 1fr;
  }
}

@media (max-width: 768px) {
  .admin-layout {
    grid-template-columns: 1fr;
  }

  .admin-sidebar {
    position: relative;
    height: auto;
    border-bottom: 1px solid rgba(255,255,255,0.15);
  }

  .admin-content {
    padding-top: 16px;
  }
}

/* Optional: slim scrollbar for sidebar (supported browsers) */
.admin-sidebar::-webkit-scrollbar { width: 8px; }
.admin-sidebar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 999px; }
.admin-sidebar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <h3>Admin</h3>
          <nav className="admin-nav">
            <NavLink to="/admin" end className={({isActive}) => `admin-link${isActive ? ' active' : ''}`}>
              Overview
            </NavLink>
            <NavLink to="/admin/users" className={({isActive}) => `admin-link${isActive ? ' active' : ''}`}>
              Users
            </NavLink>
            <NavLink to="/admin/posts" className={({isActive}) => `admin-link${isActive ? ' active' : ''}`}>
              Posts
            </NavLink>
            <NavLink to="/admin/admins" className={({isActive}) => `admin-link${isActive ? ' active' : ''}`}>
              Admins
            </NavLink>
            <NavLink to="/admin/audit" className={({isActive}) => `admin-link${isActive ? ' active' : ''}`}>
              Audit Logs
            </NavLink>
          </nav>
        </aside>
        <section className="admin-content">
          <Outlet />
        </section>
      </div>
    </>
  );
}
