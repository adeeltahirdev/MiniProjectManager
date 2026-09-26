import { createContext, useContext, useState } from "react";
import { tasks as initialTasks } from "../data/tasks"
import useAutoDismiss from "../hooks/useAutoDismiss";

const TaskContext = createContext()

export function TaskProvider({children}) {

    const [tasks, setTasks] = useState(initialTasks)
    const [loadingOperation, setLoadingOperation] = useState(null)
    const [successMessage, setSuccessMessage] = useAutoDismiss('')
    const [error, setError] = useAutoDismiss('')

    function createTask(projectId, title, status, priority, assignedUser, dueDate) {

        setLoadingOperation('create')
        setSuccessMessage('')
        setError('')

        const newTask = {
            id: Date.now(),
            projectId,
            title,
            status,
            priority,
            assignedUser,
            dueDate,
        }

        setTimeout(() => {

            const failed = Math.random() < 0.3

            if (failed) {
                setLoadingOperation(null)
                setError('Something went wrong. Try again later')
                return
            }

            setTasks(t => [
            ...t,
            newTask
        ])
            setLoadingOperation(null)
            setSuccessMessage('Task created successfully')
        }, 800);
    }

    function deleteTask(id) {

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

            setTasks(
            tasks => tasks.filter(task => task.id !== id)
        )
            setLoadingOperation(null)
            setSuccessMessage('Task deleted successfully')
        }, 800);
        
    }

    function updateTask(id, title, status, priority, assignedUser, dueDate) {

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

            setTasks(tasks => {
            return tasks.map(task => {
                if (task.id === id) {
                    return {
                        ...task,
                        title: title,
                        status: status,
                        priority: priority,
                        assignedUser: assignedUser,
                        dueDate: dueDate,
                    }
                }

                return task
            })
        })
            setLoadingOperation(null)
            setSuccessMessage('Task updated successfully')
        }, 800);

    }

    return (
        <TaskContext.Provider value={{tasks, createTask, deleteTask, updateTask, loadingOperation, successMessage, error}}>
            {children}
        </TaskContext.Provider>
    )
}

export function useTasks() {
    return useContext(TaskContext)
}