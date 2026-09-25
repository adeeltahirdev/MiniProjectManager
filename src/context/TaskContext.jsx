import { createContext, useContext, useState } from "react";
import { tasks as initialTasks } from "../data/tasks"

const TaskContext = createContext()

export function TaskProvider({children}) {

    const [tasks, setTasks] = useState(initialTasks)
    const [loadingOperation, setLoadingOperation] = useState(null)

    function createTask(projectId, title, status, priority, assignedUser, dueDate) {

        setLoadingOperation('create')

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
        }, 800);
    }

    function deleteTask(id) {

        setLoadingOperation('delete')

        setTimeout(() => {
            setTasks(
            tasks => tasks.filter(task => task.id !== id)
        )
            setLoadingOperation(null)
        }, 800);
        
    }

    function updateTask(id, title, status, priority, assignedUser, dueDate) {

        setLoadingOperation('update')

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
        }, 800);

    }

    return (
        <TaskContext.Provider value={{tasks, createTask, deleteTask, updateTask, loadingOperation}}>
            {children}
        </TaskContext.Provider>
    )
}

export function useTasks() {
    return useContext(TaskContext)
}