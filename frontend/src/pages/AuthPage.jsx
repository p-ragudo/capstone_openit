import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import "../styles/pages/auth.css"
import Logo from "../assets/Logo.png"

function AuthPage() {
    const { login, register } = useAuth()
    const [view, setView] = useState('login')
    const [email, setEmail] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async () => {
        setError(null)
        try {
            if (view === 'login') {
                await login(email, password)
            } else {
                await register(email, password, displayName)
            }
        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-blob auth-blob-left" />
            <div className="auth-blob auth-blob-right" />
            <div className="auth-card">
                <div className="auth-brand">
                    <img src={Logo} alt="Liwanag logo" className="auth-logo" />
                    <div className="auth-brand-text">
                        <span className="auth-brand-title">Liwanag</span>
                        <span className="auth-brand-sub">Energy Insight System</span>
                    </div>
                </div>

                <div className="auth-heading">
                    <h1>{ view === 'register' ? 'Create your account' : 'Welcome back' }</h1>
                    <p>{ view === 'register' ? 'Track costs and keep your household efficient.' : 'Sign in to see your latest usage.' }</p>
                </div>

                <div className="auth-form">
                    {view === 'register' && (
                        <label className="auth-field">
                            <span>Name</span>
                            <input
                                type="text"
                                value={displayName}
                                onChange={e => setDisplayName(e.target.value)}
                                placeholder="Your name"
                            />
                        </label>
                    )}

                    <label className="auth-field">
                        <span>Email</span>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="you@email.com"
                        />
                    </label>

                    <label className="auth-field">
                        <span>Password</span>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </label>

                    {error && <p className="auth-error">Failed to login or register.</p>}

                    <button className="auth-submit" onClick={handleSubmit}>
                        { view === 'register' ? "Create Account" : "Login" }
                    </button>
                </div>

                <p className="auth-switch">
                    { view === 'register' ? "Already have an account?" : "Don't have an account?" }
                    <button
                        className="auth-link"
                        onClick={() => { setView(view === 'register' ? "login" : "register"); setError(null) }}
                    >
                        { view === 'register' ? 'Login' : "Register" }
                    </button>
                </p>
            </div>
        </div>
    )
}

export default AuthPage