import { useState } from 'react'
import './styles/App.css'
import AuthPage from './pages/AuthPage'
import { useAuth } from './contexts/AuthContext'

function App() {
  const { user, logout } = useAuth()

  if(user === undefined) return <p>Loading...</p>
  if(user === null) return <AuthPage />

  return (
    <>
      <h1>Logged in</h1>
      <button onClick={logout}>Logout</button>
    </>
  )
}

export default App
