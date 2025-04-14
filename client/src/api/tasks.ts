import api from '../utils/axios';
import { Task, CreateTaskData, UpdateTaskData } from '../types/task';

export const taskApi = {
  getTasks: async () => await api.get<Task[]>('/tasks'),
  getTask: async (id: string) => await api.get<Task>(`/tasks/${id}`),
  createTask: async (data: CreateTaskData) => await api.post<Task>('/tasks', data),
  updateTask: async (id: string, data) => {
    console.log('updateTask', data);
    return await api.put<Task>(`/tasks/${id}`, data);
  },
  deleteTask: async (id: string) => await api.delete(`/tasks/${id}`),
};