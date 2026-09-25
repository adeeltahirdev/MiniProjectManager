import { createContext, useContext, useEffect, useState } from "react";
import {projects as initialprojects} from "../data/projects"

const ProjectContext = createContext()

export function Projectprovider({ children }) {

    const [projects, setProjects] = useState(initialprojects)
    const [loadingOperation, setLoadingOperation] = useState(null)
    const [successMessage, setSuccessMessage] = useState('')

    useEffect(() => {
        if (!successMessage) {
            return
        }

        const timer = setTimeout(() => {
            setSuccessMessage('')
        }, 3000);

        return () => clearTimeout(timer)
    }, [successMessage])

    function createProject(name, description) {

        setLoadingOperation('create')
        setSuccessMessage('')
        
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
            setSuccessMessage('Project created successfully')
        }, 800);

    }

    function deleteProject(id) {

        setLoadingOperation('delete')
        setSuccessMessage('')

        setTimeout(() => {
            setProjects(
            p => p.filter(project => project.id !== id)
        )
            setLoadingOperation(null)
            setSuccessMessage('Project deleted successfully')
        }, 800);

    }

    function updateProject(id, name, description) {

        setLoadingOperation('update')
        setSuccessMessage('')

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
            setSuccessMessage('Project updated successfully')
        }, 800);
    }

    return (
        <ProjectContext.Provider value={{projects, createProject, deleteProject, updateProject, loadingOperation, successMessage}}>
            {children}
        </ProjectContext.Provider>
    )
}

export function useProjects() {
    return useContext(ProjectContext)
}