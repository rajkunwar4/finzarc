import { useState } from "react";
import TaskList from "../../components/tasks/TaskList";
import { useTasks } from "../../hooks/useTask";
import { CreateTaskData, Task, TaskStatus, TaskPriority, UpdateTaskData } from "../../types/task";

export const TasksPage = () => {
  const { tasks, isLoading, createTask, updateTask, deleteTask } = useTasks();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTask, setNewTask] = useState<CreateTaskData>({
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    labels: [],
  });

  
  //create task
  const handleCreateTask = async () => {
    try {
       createTask(newTask);
      setIsCreateModalOpen(false);
      setNewTask({ title: "", description: "", status: "TODO" });
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  //delete task
  const handleDeleteTask = async (taskId: string) => {
    try {
       deleteTask(taskId);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  //edit task
  const handleEditTask = async (taskId: string, updatedTask: Task) => {
    try {
      console.log('updatedTask', updatedTask);
      await updateTask({ id: taskId, updatedTask }); // Ensure this function is defined to call the API
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-between">
          {/* create task button */}
        <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg ml-3 
                     border border-teal-900 shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <span className="">Add Task</span>
            
          </button>
        
          
        </div>

        {/* Main Content */}
        <div className="bg-gray-800 rounded-xl shadow-xl p-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          ) : (
            <TaskList
              tasks={tasks?.data}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          )}
        </div>

        {/* Create Task Modal */}
        {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4">Create New Task</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                  <select
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value as TaskStatus })}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="TODO">Todo</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as TaskPriority })}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Due Date</label>
                <input
                  type="datetime-local"
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTask}
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg"
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};