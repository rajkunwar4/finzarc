import { Task } from '../../types/task'
import { TaskCard } from './TaskCard'

type Props = {
  tasks: Task[] | undefined
  onEdit: (taskId: string, task: Task) => void
  onDelete: (taskId: string) => void
}

const TaskList = ({ tasks, onEdit, onDelete }: Props) => {
  //if no tasks, return message
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No tasks available</p>
      </div>
    );
  }

  return (
    //if tasks, return task cards
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={(taskId, task) => onEdit(taskId, task)}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </div>
  )
}

export default TaskList