import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserData } from '../services/api';

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
          // Clear localStorage if user data fetch fails
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = (token, userId, userData = null) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    if (userData) {
      setUser(userData);
    } else {
      // If userData is not provided, fetch it
      getUserData(userId, token)
        .then(fetchedUserData => setUser(fetchedUserData))
        .catch(error => {
          console.error('Failed to fetch user data:', error);
          // You might want to handle this error, e.g., by logging out the user
        });
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