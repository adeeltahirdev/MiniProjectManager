import { useProjects } from "../context/ProjectContext";

function Dashboard() {

    const {projects, createProject} = useProjects()

    function handleCreate() {
        createProject(
            'Test Project',
            'This project was created through Context API.'
        )
    }

    return(
        <div>
            <h1>Dashboard</h1>

            <button onClick={handleCreate}>Create test project</button>

            {projects.map(project => (
                <div key={project.id}>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                </div>
            ))}
        </div>        
    );
}

export default Dashboard