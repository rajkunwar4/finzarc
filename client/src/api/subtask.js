import api from "../utils/axios";

export const subtaskApi = {
  createSubtask: async (taskId, data) => await api.post(`/subtask?taskId=${taskId}`, data),
  updateSubtask: async (id, data) => await api.put(`/subtask/${id}`, data),
  deleteSubtask: async (id) => await api.delete(`/subtask/${id}`),
  toggleSubtask: async (id) => await api.patch(`/subtask/${id}/toggle`),
}

