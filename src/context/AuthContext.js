import React, { createContext, useState, useEffect, useContext } from 'react';
import * as authService from '../api/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const userData = await authService.login(email, password);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.token);
      return userData;
    } catch (error) {
      setUser(null);
      localStorage.removeItem('user');
        localStorage.removeItem('token');
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const userData = await authService.register(name, email, password);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.token);
      return userData;
    } catch (error) {
      setUser(null);
      localStorage.removeItem('user');
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser ,token: user?.token}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
