import { useParams } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import { useState } from "react";
import CreateTask from "../components/CreateTask";
import EditTask from "../components/EditTask";
import Loader from "../components/Loader";

function ProjectDetails() {
  const { projectId } = useParams();
  const { projects } = useProjects();
  const { tasks, loadingOperation } = useTasks();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editTask, setEditTask] = useState(null);

  function handleAddTask() {
    setShowCreateForm(true);
  }

  function handleEdit(task) {
    setEditTask(task);
  }

  const idInt = parseInt(projectId, 10);

  const project = projects.find((p) => p.id === idInt);

  if (!project) {
    return (
      <>
        <div className="header">
          <h1>Project Details</h1>
        </div>

        <div className="project-details">
          <h2 className="name">Project not found</h2>
          <p className="description">
            This project doesn't exist or may have been deleted.
          </p>
        </div>
      </>
    );
  }

  const projectTask = tasks.filter((t) => t.projectId === idInt);

  return (
    <>
      <div className="header">
        <h1>Project Details</h1>
        <button className="create-btn" onClick={handleAddTask}>
          + Add Task
        </button>
      </div>

      {showCreateForm && (
        <CreateTask onClose={() => setShowCreateForm(false)} />
      )}

      {editTask && (
        <EditTask task={editTask} onClose={() => setEditTask(null)} />
      )}

      <div className="project-details">
        <h2 className="name">{project.name}</h2>
        <p className="description">{project.description}</p>
      </div>

      {loadingOperation === "create" ? (
        <Loader message="Adding task..." />
      ) : loadingOperation === "update" ? (
        <Loader message="Updating task..." />
      ) : loadingOperation === "delete" ? (
        <Loader message="Deleting task..." />
      ) : projectTask.length === 0 ? (
        <div className="task-empty">
          <p>No tasks yet for this project.</p>
          <button className="create-btn" onClick={handleAddTask}>
            Add the first task
          </button>
        </div>
      ) : (
        <div className="task-grid">
          {projectTask.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={handleEdit} />
          ))}
        </div>
      )}
    </>
  );
}

export default ProjectDetails;
