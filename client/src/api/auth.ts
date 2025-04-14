import api from '../utils/axios';
import { LoginData, RegisterData, User, AuthResponse } from '../types/auth';

export const authApi = {
  login: async (data: LoginData) => await api.post<LoginData>('/auth/login', data),
  register: async (data: RegisterData) => await api.post<RegisterData>('/auth/register', data),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};