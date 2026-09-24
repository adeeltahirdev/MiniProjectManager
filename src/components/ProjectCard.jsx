

function ProjectCard({project}) {

  return (
    <div className="card">
          <div className="card-header">
            <h3>{project.name}</h3>
          </div>

          <p>{project.description}</p>

          <div className="card-action">
            <button className="edit-btn">Edit</button>
            <button className="del-btn">Delete</button>
          </div>
        </div>
  );
}

export default ProjectCard