import { useState } from "react";
import CreateProject from "../components/CreateProject";
import { useProjects } from "../context/ProjectContext";
import ProjectCard from "../components/ProjectCard";
import Editproject from "../components/EditProject";

function Dashboard() {
  const [showCreateform, setShowCreateForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const { projects } = useProjects();

  function handleCreate() {
    setShowCreateForm(true);
  }

  function handleEdit(project) {
    setEditingProject(project);
  }

  return (
    <>
      <div className="header">
        <h1>Dashboard</h1>

        <button className="create-btn" onClick={handleCreate}>
          Create project
        </button>
      </div>

      <div>
        {showCreateform && (
          <CreateProject onClose={() => setShowCreateForm(false)} />
        )}

        {editingProject && (
          <Editproject
            project={editingProject}
            onClose={() => setEditingProject(null)}
          />
        )}
      </div>

      {projects.length === 0 ? (
        <div className="task-empty">
          <p>No projects to show here yet.</p>
          <button className="create-btn" onClick={handleCreate}>
            Add Your first project
          </button>
        </div>
      ) : (
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Dashboard;
