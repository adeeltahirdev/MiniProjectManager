import { createContext, useContext, useState } from "react";
import { users } from '../data/users'

const AuthContext = createContext()

export function AuthProvider({children}) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

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

    function logout() {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext)
}