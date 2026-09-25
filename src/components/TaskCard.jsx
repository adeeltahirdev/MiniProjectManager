import { useTasks } from "../context/TaskContext";
import { users } from "../data/users";

function TaskCard({ task, onEdit }) {

  const {deleteTask} = useTasks()

  const assignedUser = users.find(
    user => user.id === task.assignedUser
  )

  return (
    <div className="task-card">
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
      </div>

      <p
        className="task-status"
        data-status={task.status.toLowerCase().replace(/\s+/g, "-")}
      >
        {task.status}
      </p>

      <span
        className="task-priority"
        data-priority={task.priority.toLowerCase()}
      >
        {task.priority}
      </span>

      <p className="task-user">
        <span>Assigned User</span>
        <span>{assignedUser ? assignedUser.username : "Unassigned"}</span>
      </p>

      <span className="task-due">
        <span>Due</span>
        <span>{task.dueDate || "Not set"}</span>
      </span>

      <div className="action-btn">
        <button className="edit-btn" onClick={() => onEdit(task)}>Edit</button>
        <button className="del-btn" onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    </div>
  );
}

export default TaskCard;
