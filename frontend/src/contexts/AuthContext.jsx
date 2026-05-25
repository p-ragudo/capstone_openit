import { createContext, useContext, useState, useEffect } from 'react'
import { requestJson } from '../services/ApiClient.jsx'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined)

    useEffect(() => {
        requestJson('/manage/info', { root: true })
            .then(setUser)
            .catch(() => setUser(null))
    }, [])

    const register = async (email, password) => {
        await requestJson('/register', {
            root: true,
            method: 'POST',
            body: JSON.stringify({ email, password }),
        })

        await login(email, password)
    }

    const login = async (email, password) => {
        await requestJson('/login?useCookies=true', {
            root: true,
            method: 'POST',
            body: JSON.stringify({ email, password }),
        })
        const info = await requestJson('/manage/info', { root: true })
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