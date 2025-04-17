import api from '../utils/axios';

export const authApi = {
  login: async (data) => await api.post('/auth/login', data),
  register: async (data) => await api.post('/auth/register', data),
}