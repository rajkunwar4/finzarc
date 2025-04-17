import { useState } from "react";
import { format } from "date-fns";


export const TaskCard = ({ task, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  //status colors
  const statusColors = {
    TODO: 'bg-yellow-500/20 text-yellow-400 font-light border border-yellow-400 text-xs',
    IN_PROGRESS: 'bg-blue-500/20 text-blue-400 font-light border border-blue-400 text-xs',
    COMPLETED: 'bg-green-500/20 text-green-400 font-light border border-green-400 text-xs'
  };

  //priority colors
  const priorityColors = {
    LOW: 'bg-gray-500/20 text-gray-400 border border-gray-400 text-xs',
    MEDIUM: 'bg-orange-500/20 text-orange-400 border border-orange-400 text-xs',
    HIGH: 'bg-red-500/20 text-red-400 border border-red-400 text-xs'
  };

  //handle save
  const handleSave = () => {
    const updatedTask = {
      title: editedTask.title,
      description: editedTask.description,
      status: editedTask.status,
      priority: editedTask.priority,
      dueDate: editedTask.dueDate ? new Date(editedTask.dueDate) : null,
      labels: editedTask.labels // Include labels if needed
    };
    onEdit(task.id, updatedTask); // Ensure task.id and updatedTask are passed correctly
    setIsEditing(false);
  };

  //edit task
  if (isEditing) {
    return (
      <div className="bg-gray-700 rounded-lg p-4 shadow-lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              className="w-full bg-gray-600 text-white rounded px-3 py-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea
              value={editedTask.description}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              className="w-full bg-gray-600 text-white rounded px-3 py-2"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
              <select
                value={editedTask.status}
                onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
                className="w-full bg-gray-600 text-white rounded px-3 py-2"
              >
                <option value="TODO">Todo</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            {/* priority */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
              <select
                value={editedTask.priority}
                onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value  })}
                className="w-full bg-gray-600 text-white rounded px-3 py-2"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          {/* due date */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Due Date</label>
            <input
              type="datetime-local"
              value={editedTask.dueDate ? editedTask.dueDate.slice(0, 16) : ''}
              onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
              className="w-full bg-gray-600 text-white rounded px-3 py-2"
            />
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-teal-500 hover:bg-teal-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  //task card
  return (
    <div className="bg-gray-700 rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-200">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h3 className="text-lg font-light text-white">{task.title}</h3>
          <p className="text-gray-300  font-light">{task.description}</p>
          
          <div className="flex flex-wrap gap-2 items-center">
            <span className={`inline-block px-3 py-1 rounded-full text-sm ${statusColors[task.status]}`}>
              {task.status}
            </span>
            <span className={`inline-block px-3 py-1 rounded-full text-sm ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
            {task.dueDate && (
              <span className="inline-block px-3 py-1 rounded-full text-sm font-light bg-violet-500/20 text-violet-400  border border-violet-400">
                Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-400 hover:text-teal-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};