import { useSearchParams } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";
import CreateProject from "../components/CreateProject";
import { useState } from "react";

function Dashboard() {

    const {projects} = useProjects()

    const [showCreateform, setShowCreateForm] = useState(false)

    function handleCreate() {
        
        setShowCreateForm(true)
        
        
    }

    return(
        <div>
            <h1>Dashboard</h1>

            <button onClick={handleCreate}>Create test project</button>

            {showCreateform && <CreateProject onClose={() => setShowCreateForm(false)}/>}

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