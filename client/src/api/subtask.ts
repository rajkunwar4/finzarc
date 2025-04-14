import { Subtask } from "../types/subtask";
import api from "../utils/axios";

export const subtaskApi = {
  createSubtask: async ( taskId: string, data: Subtask) => await api.post<Subtask>(`/subtask?taskId=${taskId}`, data),
  updateSubtask: async (id: string, data: Subtask) => await api.put<Subtask>(`/subtask/${id}`, data),
  deleteSubtask: async (id: string) => await api.delete<Subtask>(`/subtask/${id}`),
  toggleSubtask: async (id: string) => await api.patch<Subtask>(`/subtask/${id}/toggle`),
}

