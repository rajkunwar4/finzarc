import { useParams } from 'react-router-dom';

export const TaskDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-semibold text-gray-900">Task Details</h1>
      {/* Add task detail content */}
    </div>
  );
};