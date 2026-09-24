import { createContext, useContext, useState } from "react";
import { users as initialUsers } from '../data/users'

const AuthContext = createContext()

export function AuthProvider({children}) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState(initialUsers)

    function login(email, password) {
        
        setLoading(true)

       return new Promise(resolve => {
             setTimeout(() => {

                const findUser = users.find(
                    user => user.email === email && user.password === password
                )


                if (!findUser) {
                    setLoading(false)

                    resolve ({
                        success: false,
                        message: 'Invalid credentials!'
                    })

                    return
                }

                setUser({
                        id: findUser.id,
                        username: findUser.username,
                        email: findUser.email,
                    })

                setLoading(false)

                resolve ({
                    success: true,
                })

            }, 800)
        })


    }

    function register(username, email, password) {
        setLoading(true)

        const dynamicUserid = Math.max(
            ...users.map(user => user.id)
        ) + 1

        const newUser = {
            id: dynamicUserid,
            username,
            email,
            password,
        }

        return new Promise(resolve => {
            setTimeout(() => {
                const userExist = users.find(user => user.email === email)

                if (!userExist) {
                    
                    setUsers(u => [
                        ...u, newUser
                    ])

                    setUser({
                        id: newUser.id,
                        username: newUser.username,
                        email: newUser.email,
                    })

                    setLoading(false)

                    resolve({
                        success: true
                    })

                    return
                }
                else {
                    setLoading(false)

                    resolve({
                        success: false,
                        message: 'User already exist with this email'
                    })
                }

            }, 800);
        })
    }

    function logout() {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, login, logout, loading, register}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext)
}