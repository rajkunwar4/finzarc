import api from '../utils/axios';

export const taskApi = {
  getTasks: async () => await api.get('/tasks'),
  getTask: async (id) => await api.get(`/tasks/${id}`),
  createTask: async (data) => await api.post('/tasks', data),
  updateTask: async (id, data) =>  await api.put(`/tasks/${id}`, data),
  deleteTask: async (id) => await api.delete(`/tasks/${id}`),
};