import { createContext, useContext, useState } from "react";
import { tasks as initialTasks } from "../data/tasks"

const TaskContext = createContext()

export function TaskProvider({children}) {

    const [tasks, setTasks] = useState(initialTasks)

    function createTask(projectId, title, status, priority, assignedUser, dueDate) {

        const newTask = {
            id: Date.now(),
            projectId,
            title,
            status,
            priority,
            assignedUser,
            dueDate,
        }

        setTasks(t => [
            ...t,
            newTask
        ])
    }

    function deleteTask(id) {

        setTasks(
            tasks => tasks.filter(task => task.id !== id)
        )
        
    }

    function updateTask(id, title, status, priority, assignedUser, dueDate) {

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

    }

    return (
        <TaskContext.Provider value={{tasks, createTask, deleteTask, updateTask}}>
            {children}
        </TaskContext.Provider>
    )
}

export function useTasks() {
    return useContext(TaskContext)
}