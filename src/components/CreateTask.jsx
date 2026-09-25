import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { useParams } from "react-router-dom";
import { users } from "../data/users"

function CreateTask({ onClose }) {
  const { projectId } = useParams();

  const intId = parseInt(projectId, 10);

  const { createTask } = useTasks();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");
  const [assignedUser, setAssignedUser] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault();

    setError('')

    if (title.trim() === '') {
      setError('Title is required')
      return
    }

    createTask(intId, title, status, priority, assignedUser, dueDate)

    onClose?.();
  }

  return (
    <div className="container" onClick={onClose}>
      <form
        className="task-form"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Add Task</h2>

        <div className="task-group">
          <label htmlFor="task-title">Title</label>
          <input
            id="task-title"
            type="text"
            placeholder="Enter task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="task-group">
          <label htmlFor="status">Select Status</label>
          <select
            id="status"
            className="status-selection"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="task-group">
          <label htmlFor="priority">Select Priority</label>
          <select
            id="priority"
            className="priority-selection"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="task-group">
          <label htmlFor="user">Assign User</label>
          <select
            id="user"
            className="user-selection"
            value={assignedUser}
            onChange={(e) => setAssignedUser(e.target.value)}
          >
            <option value=''>Select a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <div className="task-group">
          <label htmlFor="dueDate">Add Due Date</label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="add-btn">Add Task</button>
      </form>
    </div>
  );
}

export default CreateTask;
