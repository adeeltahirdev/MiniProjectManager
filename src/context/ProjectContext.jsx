import { createContext, useContext, useState } from "react";
import {projects as initialprojects} from "../data/projects"

const ProjectContext = createContext()

export function Projectprovider({ children }) {

    const [projects, setProjects] = useState(initialprojects)
    const [loading, setLoading] = useState(false)

    function createProject(name, description) {

        const newproject = {
            id: Date.now(),
            name,
            description,
        }

        setProjects(p => [
            ...p, newproject
        ])

    }

    return (
        <ProjectContext.Provider value={{projects, createProject}}>
            {children}
        </ProjectContext.Provider>
    )
}

export function useProjects() {
    return useContext(ProjectContext)
}