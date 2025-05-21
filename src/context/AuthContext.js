import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  login as loginApi,
  register as registerApi,
  getCurrentUser,
} from '../api/auth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Установка заголовков авторизации
  const setAuthHeaders = useCallback((token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, []);

  // Загрузка данных пользователя
  const fetchUserData = useCallback(async () => {
    try {
      if (token) {
        setAuthHeaders(token);
        const result = await getCurrentUser(token);
        if (result.success) {
          setUser(result.data);
          setIsAnonymous(false);
        } else {
          logout();
        }
      } else {
        setIsAnonymous(true);
        setUser(null);
      }
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  }, [token, setAuthHeaders]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const login = async (email, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      const result = await loginApi(email, password);
      if (result.success) {
        localStorage.setItem('token', result.data.token);
        setToken(result.data.token);
        await fetchUserData(); // Обновляем данные пользователя
        return { success: true };
      } else {
        setAuthError(result.message || 'Login failed');
        return { success: false, message: result.message };
      }
    } catch (error) {
      setAuthError('An error occurred during login');
      return { success: false, message: 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      const result = await registerApi(username, email, password);
      if (result.success) {
        // Автоматический вход после регистрации
        return await login(email, password);
      } else {
        setAuthError(result.message || 'Registration failed');
        return { success: false, message: result.message };
      }
    } catch (error) {
      setAuthError('An error occurred during registration');
      return { success: false, message: 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAnonymous(true);
    setAuthError(null);
    setAuthHeaders(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAnonymous,
        authError,
        setAuthError,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
