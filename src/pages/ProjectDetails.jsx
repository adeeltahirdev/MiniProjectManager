import { useParams } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";

function ProjectDetails() {
  const { projectId } = useParams();
  const { projects } = useProjects();

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

  return (
    <>
      <div className="header">
        <h1>Project Details</h1>
      </div>

      <div className="project-details">
        <h2 className="name">{project.name}</h2>
        <p className="description">{project.description}</p>
      </div>
    </>
  );
}

export default ProjectDetails;
