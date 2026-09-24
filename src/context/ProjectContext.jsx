import { createContext, useContext, useState } from "react";
import {projects as initialprojects} from "../data/projects"

const ProjectContext = createContext()

export function Projectprovider({ children }) {

    const [projects, setProjects] = useState(initialprojects)

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

    function deleteProject(id) {

        setProjects(
            projects.filter(project => project.id !== id)
        )

    }

    function updateProject(id, name, description) {

        setProjects(p => {
            return p.map(project => {
                
                if (project.id === id) {
                    return {
                        ...project,
                        name: name,
                        description: description,
                    }
                }

                return project
            })
        })
    }

    return (
        <ProjectContext.Provider value={{projects, createProject, deleteProject, updateProject}}>
            {children}
        </ProjectContext.Provider>
    )
}

export function useProjects() {
    return useContext(ProjectContext)
}