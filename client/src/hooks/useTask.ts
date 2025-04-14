import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskApi } from '../api/tasks';
import { UpdateTaskData } from '../types/task';

export const useTasks = () => {
  const queryClient = useQueryClient();

  const tasksQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: taskApi.getTasks,
  });
  const createTaskMutation = useMutation({
    mutationFn: taskApi.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
  const updateTaskMutation = useMutation({
    mutationFn: ({ id, updatedTask }: { id: string; updatedTask: UpdateTaskData }) => taskApi.updateTask(id, updatedTask),
    onSuccess: () => {    
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
  const deleteTaskMutation = useMutation({
    mutationFn: taskApi.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return {
    tasks: tasksQuery.data?.data,
    isLoading: tasksQuery.isLoading,
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
  };
};