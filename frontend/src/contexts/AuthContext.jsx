import { createContext, useContext, useState, useEffect } from 'react'
import { requestJson } from '../services/ApiClient.jsx'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined)

    useEffect(() => {
        requestJson('/api/auth/user', { root: true })
            .then(setUser)
            .catch(() => setUser(null))
    }, [])

    const register = async (email, password, displayName) => {
        try {
            await requestJson('/api/auth/register', {
                root: true,
                method: 'POST',
                body: JSON.stringify({ 
                    Email: email, 
                    Password: password, 
                    DisplayName: displayName 
                }),
            })
        } catch (error) {
            console.error(error)
        }

        await login(email, password)
    }

    const login = async (email, password) => {
        await requestJson('/api/auth/login', {
            root: true,
            method: 'POST',
            body: JSON.stringify({ 
                Email: email, 
                Password: password 
            }),
        })
        const info = await requestJson('/api/auth/user', { root: true })
        setUser(info)
    }

    const logout = async () => {
        await requestJson('/api/auth/logout', { root: true, method: 'POST' })
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)