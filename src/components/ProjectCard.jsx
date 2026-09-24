import { Link } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";


function ProjectCard({project, onEdit}) {

    const {deleteProject} = useProjects()

  return (
    <div className="card">
          <div className="card-header">
            <h3>{project.name}</h3>
          </div>

          <p>{project.description}</p>

          <div className="card-action">
            <Link to={`/projects/${project.id}`}>
              <button className="view-btn">view Project</button>
            </Link>
            <button className="edit-btn" onClick={() => onEdit(project)}>Edit</button>
            <button className="del-btn" onClick={() => deleteProject(project.id)}>Delete</button>
          </div>
        </div>
  );
}

export default ProjectCard