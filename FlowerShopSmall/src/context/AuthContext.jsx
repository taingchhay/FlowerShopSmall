import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'admin' or 'user'

  useEffect(() => {
    // Check for stored admin token
    const storedAdminToken = localStorage.getItem('adminToken');
    if (storedAdminToken) {
      setToken(storedAdminToken);
      setIsAuthenticated(true);
      setUserType('admin');
      setUser({ role: 'admin' });
      return;
    }

    // Check for stored user auth
    const userAuth = localStorage.getItem('userAuth');
    if (userAuth) {
      try {
        const userData = JSON.parse(userAuth);
        setToken(userData.token);
        setIsAuthenticated(true);
        setUserType('user');
        setUser(userData.user);
      } catch (error) {
        console.error('Error parsing user auth:', error);
        localStorage.removeItem('userAuth');
      }
    }
  }, []);

  const login = (authToken, type = 'admin', userData = null) => {
    if (type === 'admin') {
      localStorage.setItem('adminToken', authToken);
      setUser({ role: 'admin' });
      setUserType('admin');
    } else {
      const userAuthData = { token: authToken, user: userData };
      localStorage.setItem('userAuth', JSON.stringify(userAuthData));
      setUser(userData);
      setUserType('user');
    }
    setToken(authToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userAuth');
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
    setUserType(null);
  };

  const value = {
    token,
    isAuthenticated,
    user,
    userType,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
