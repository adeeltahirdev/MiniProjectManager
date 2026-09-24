import CreateProject from "../components/CreateProject";
import { useState } from "react";
import { useProjects } from "../context/ProjectContext";
import ProjectCard from "../components/ProjectCard";

function Dashboard() {

    const [showCreateform, setShowCreateForm] = useState(false)

    const {projects} = useProjects()

    function handleCreate() {
        
        setShowCreateForm(true)
        
        
    }

    return(
        <>
            <div>
                <h1>Dashboard</h1>

                <button onClick={handleCreate}>Create test project</button>

                {showCreateform && <CreateProject onClose={() => setShowCreateForm(false)}/>}

                
            </div>

            <div className="project-grid">
                {projects.map(project => (
                    <ProjectCard 
                        key={project.id}
                        project={project}
                    />
                ))}
            </div>
        </>
    );
}

export default Dashboard