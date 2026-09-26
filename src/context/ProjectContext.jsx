import { createContext, useContext, useState } from "react";
import {projects as initialprojects} from "../data/projects"
import useAutoDismiss from "../hooks/useAutoDismiss";

const ProjectContext = createContext()

export function Projectprovider({ children }) {

    const [projects, setProjects] = useState(initialprojects)
    const [loadingOperation, setLoadingOperation] = useState(null)
    const [successMessage, setSuccessMessage] = useAutoDismiss('')
    const [error, setError] = useAutoDismiss('')

    function createProject(name, description) {

        setLoadingOperation('create')
        setSuccessMessage('')
        setError('')
        
        const newproject = {
            id: Date.now(),
            name,
            description,
        }

        setTimeout(() => {

            const failed = Math.random() < 0.3

            if (failed) {
                setLoadingOperation(null)
                setError('Something went wrong. Try again later')
                return
            }
            
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
        setError('')

        

        setTimeout(() => {
            
            const failed = Math.random() < 0.3

            if (failed) {
                setLoadingOperation(null)
                setError('Something went wrong. Try again later')
                return
            }

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
        setError('')

        setTimeout(() => {

            const failed = Math.random() < 0.3

            if (failed) {
                setLoadingOperation(null)
                setError('Something went wrong. Try again later')
                return
            }

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
        <ProjectContext.Provider value={{projects, createProject, deleteProject, updateProject, loadingOperation, successMessage, error}}>
            {children}
        </ProjectContext.Provider>
    )
}

export function useProjects() {
    return useContext(ProjectContext)
}