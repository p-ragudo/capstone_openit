import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"

function AuthPage() {
    const { login, register } = useAuth()
    const [view, setView] = useState('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async () => {
        setError(null)
        try {
            if (view === 'login') {
                await login(email, password)
            } else {
                await register(email, password)
            }
        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <div>
            <h1>Application</h1>
            <div>
                {/* Replace span with p or any h1, h2 if any styling complications */}
                <span>{ view === 'register' ? 'Register' : 'Login' }</span>
                <div>
                    <label>Email</label>
                    <input 
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                {error && <p className="error">Failed to login or register</p>}

                <button onClick={handleSubmit}>
                    { view === 'register' ? "Register" : "Login" }
                </button>

                <p>
                    { view === 'register' ? "Already have an account?" : "Don't have an account?"}
                    <button onClick={() => { setView(view === 'register' ? "login" : "register"); setError(null) }}>
                        { view === 'register' ? 'Login' : "Register"}
                    </button>
                </p>
            </div>
        </div>
    )
}

export default AuthPage