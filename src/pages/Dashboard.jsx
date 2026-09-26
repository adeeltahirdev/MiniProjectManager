import { useState } from "react";
import CreateProject from "../components/CreateProject";
import { useProjects } from "../context/ProjectContext";
import ProjectCard from "../components/ProjectCard";
import Editproject from "../components/EditProject";
import Loader from "../components/Loader";
import Success from "../components/Success";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

function Dashboard() {
  const [showCreateform, setShowCreateForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const { projects, loadingOperation, successMessage, error } = useProjects();

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

      {successMessage && (
        <Success message={successMessage}/>
      )}

      {error && (
        <ErrorMessage message={error}/>
      )}

      {loadingOperation === "create" ? (
        <Loader message="Adding project..." />
      ) : loadingOperation === "update" ? (
        <Loader message="Updating project..." />
      ) : loadingOperation === "delete" ? (
        <Loader message="Deleting project..." />
      ) : projects.length === 0 ? (
        <EmptyState 
          message='No projects to show here yet.'
          actionLabel='Add your first project'
          onAction={handleCreate}
        />
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
