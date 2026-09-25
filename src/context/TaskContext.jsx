import { createContext, useContext, useState } from "react";
import { tasks as initialTasks } from "../data/tasks"

const TaskContext = createContext()

export function TaskProvider({children}) {

    const [tasks, setTasks] = useState(initialTasks)

    return (
        <TaskContext.Provider value={{tasks}}>
            {children}
        </TaskContext.Provider>
    )
}

export function useTasks() {
    return useContext(TaskContext)
}