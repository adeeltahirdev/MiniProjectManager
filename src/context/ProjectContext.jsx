import { createContext, useContext, useState } from "react";
import {projects as initialprojects} from "../data/projects"

const ProjectContext = createContext()

export function Projectprovider({ children }) {
    const [projects, setProjects] = useState(initialprojects)

    return (
        <ProjectContext.Provider value={{projects}}>
            {children}
        </ProjectContext.Provider>
    )
}

export function useProjects() {
    return useContext(ProjectContext)
}