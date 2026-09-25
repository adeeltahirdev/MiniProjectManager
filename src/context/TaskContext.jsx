import { createContext, useContext, useEffect, useState } from "react";
import { tasks as initialTasks } from "../data/tasks"

const TaskContext = createContext()

export function TaskProvider({children}) {

    const [tasks, setTasks] = useState(initialTasks)
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

    function createTask(projectId, title, status, priority, assignedUser, dueDate) {

        setLoadingOperation('create')
        setSuccessMessage('')

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

        setTimeout(() => {
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

        setTimeout(() => {
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
        <TaskContext.Provider value={{tasks, createTask, deleteTask, updateTask, loadingOperation, successMessage}}>
            {children}
        </TaskContext.Provider>
    )
}

export function useTasks() {
    return useContext(TaskContext)
}