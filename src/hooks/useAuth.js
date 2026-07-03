import { useMemo } from 'react';
import { useAuth as useAuthContext } from '../context/AuthContext';

export default function useAuth() {
  const { user } = useAuthContext();
  const currentUser = user || null;
  const isAdmin = useMemo(() => {
    if (!currentUser) return false;
    const role = currentUser.role || currentUser.userRole || currentUser.isAdmin;
    if (typeof role === 'boolean') return role;
    if (typeof role === 'string') return role.toLowerCase() === 'admin';
    return false;
  }, [currentUser]);
  return { currentUser, isAdmin };
}
