import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('nike_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('nike_user', JSON.stringify(userData));
  };

  const signup = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('nike_user', JSON.stringify(userData));
  };

  const updateUser = (newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    localStorage.setItem('nike_user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('nike_user');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
