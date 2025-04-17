import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize with current auth state
    const token = localStorage.getItem('token');
    return token;
  });

  // Verify token validity
  const verifyAuth = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      setIsAuthenticated(false);
      return false;
    }
    
    try {
      // Basic token validation (you can add more robust validation)
      const parsedUser = JSON.parse(user);
      if (!parsedUser) {
        throw new Error('Invalid user data');
      }
      return true;
    } catch (error) {
      console.error('Auth verification failed:', error);
      handleLogout();
      return false;
    }
  };

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      const { data } = response;
      if (!data?.data?.token || !data?.data?.user) {
        throw new Error('Invalid response data');
      }
      
      // Store token and user data
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      setIsAuthenticated(true);
      navigate('/tasks');
    },
    onError: (error) => {
      console.error('Login failed:', error);
      handleLogout();
    }
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (response) => {
      const { data } = response;
      if (!data?.data?.token || !data?.data?.user) {
        throw new Error('Invalid response data');
      }
      
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      setIsAuthenticated(true);
      navigate('/tasks');
    },
    onError: (error) => {
      console.error('Registration failed:', error);
      handleLogout();
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    queryClient.clear();
  };

  // Logout with navigation
  const logout = () => {
    handleLogout();
    navigate('/login');
  };

  const user = localStorage.getItem('user');
  const parsedUser = JSON.parse(user);

  // Verify auth on mount and when isAuthenticated changes
  useEffect(() => {
    verifyAuth();
  }, []);

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    isAuthenticated,
    error: loginMutation.error || registerMutation.error,
    user: parsedUser
  };
};