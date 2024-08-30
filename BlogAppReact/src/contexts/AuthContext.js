// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserData } from '../services/api'; // You'll need to implement this function

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      if (token && userId) {
        try {
          const userData = await getUserData(userId, token);
          setUser(userData);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (token, userId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    try {
      const userData = await getUserData(userId, token);
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);