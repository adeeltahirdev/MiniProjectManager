import { createContext, useContext, useState } from "react";
import {projects as initialprojects} from "../data/projects"

const ProjectContext = createContext()

export function Projectprovider({ children }) {

    const [projects, setProjects] = useState(initialprojects)
    const [loadingOperation, setLoadingOperation] = useState(null)

    function createProject(name, description) {

        setLoadingOperation('create')
        
        const newproject = {
            id: Date.now(),
            name,
            description,
        }

        setTimeout(() => {
            setProjects(p => [
            ...p, newproject
        ])
            setLoadingOperation(null)
        }, 800);

    }

    function deleteProject(id) {

        setLoadingOperation('delete')

        setTimeout(() => {
            setProjects(
            p => p.filter(project => project.id !== id)
        )
            setLoadingOperation(null)
        }, 800);

    }

    function updateProject(id, name, description) {

        setLoadingOperation('update')

        setTimeout(() => {
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
            setLoadingOperation(null)
        }, 800);
    }

    return (
        <ProjectContext.Provider value={{projects, createProject, deleteProject, updateProject, loadingOperation}}>
            {children}
        </ProjectContext.Provider>
    )
}

export function useProjects() {
    return useContext(ProjectContext)
}