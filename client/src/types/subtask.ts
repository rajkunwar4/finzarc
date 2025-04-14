export interface Subtask {
    id: string;
    title: string;
    completed: boolean;
    taskId: string;
  }
  
  export interface CreateSubtaskData {
    title: string;
    taskId: string;
  }
  
  export interface UpdateSubtaskData {
    title?: string;
    completed?: boolean;
  }