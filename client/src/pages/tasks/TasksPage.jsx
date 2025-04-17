import { useState } from "react";
import TaskList from "../../components/tasks/TaskList";
import { useTasks } from "../../hooks/useTask";


export const TasksPage = () => {
  const { tasks, isLoading, createTask, updateTask, deleteTask } = useTasks();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  // create task
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    labels: [],
  });

  const [activeStatus, setActiveStatus] = useState("ALL");
  const [sortBy, setSortBy] = useState(
    "createdAt"
  );

  // Filter and sort tasks
  const filteredAndSortedTasks = tasks?.data
    ?.filter((task) => activeStatus === "ALL" || task.status === activeStatus)
    ?.sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case "priority": {
          const priorityWeight = { HIGH: 3, MEDIUM: 2, LOW: 1 };
          return priorityWeight[b.priority] - priorityWeight[a.priority];
        }
        default: // createdAt
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
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
  const handleDeleteTask = async (taskId) => {
    try {
      deleteTask(taskId);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  //edit task
  const handleEditTask = async (taskId, updatedTask) => {
    try {
      console.log("updatedTask", updatedTask);
      updateTask({ id: taskId, updatedTask }); // Ensure this function is defined to call the API
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            {/* create task button */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg ml-3 
                       border border-teal-900 shadow-lg transition-all duration-200 flex items-center space-x-2"
            >
              <span className="text-sm font-light">Add Task</span>
            </button>

                      {/* Status filter tabs */}
          <div className="flex gap-2 bg-gray-800 p-1 rounded-full text-sm">
            {["ALL", "TODO", "IN_PROGRESS", "COMPLETED"].map((status) => (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`flex-1 px-2 py-1  rounded-full transition-all duration-200  ${
                  activeStatus === status
                    ? "bg-teal-600 text-white rounded-full"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span className="text-xs font-light whitespace-nowrap">{status.replace("_", " ")}</span>
              </button>
            ))}
          </div>

            {/* sort by */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full text-sm font-light bg-gray-700 text-white rounded-lg px-2 py-2 focus:ring-2 focus:ring-teal-500"
              >
                <option value="createdAt">Created At</option>
                <option value="dueDate">Due Date</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>


        </div>

        {/* Main Content */}
        <div className="bg-gray-800 rounded-xl shadow-xl p-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          ) : (
            <TaskList
              tasks={filteredAndSortedTasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          )}
        </div>

        {/* Create Task Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold text-white mb-4">
                Create New Task
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Status
                    </label>
                    <select
                      value={newTask.status}
                      onChange={(e) =>
                        setNewTask({
                          ...newTask,
                          status: e.target.value,
                        })
                      }
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="TODO">Todo</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Priority
                    </label>
                    <select
                      value={newTask.priority}
                      onChange={(e) =>
                        setNewTask({
                          ...newTask,
                          priority: e.target.value,
                        })
                      }
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Due Date
                  </label>
                  <input
                    type="datetime-local"
                    onChange={(e) =>
                      setNewTask({ ...newTask, dueDate: e.target.value })
                    }
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
