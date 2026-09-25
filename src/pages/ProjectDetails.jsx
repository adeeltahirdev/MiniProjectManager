import { useParams } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import { useState } from "react";
import CreateTask from "../components/CreateTask";

function ProjectDetails() {
  const { projectId } = useParams();
  const { projects } = useProjects();
  const { tasks } = useTasks()

  const [showCreateForm, setShowCreateForm] = useState(false)

  function handleAddTask() {
    setShowCreateForm(true)
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

  const projectTask = tasks.filter(t => t.projectId === idInt)

  return (
    <>
      <div className="header">
        <h1>Project Details</h1>
        <button className="create-btn" onClick={handleAddTask}>+ Add Task</button>
      </div>

      {showCreateForm && <CreateTask onClose={() => setShowCreateForm(false)} />}

      <div className="project-details">
        <h2 className="name">{project.name}</h2>
        <p className="description">{project.description}</p>
      </div>

      <div className="task-grid">
        {projectTask.map(task => (
            <TaskCard 
                key={task.id}
                task={task}
            />
        ))}
      </div>
    </>
  );
}

export default ProjectDetails;
