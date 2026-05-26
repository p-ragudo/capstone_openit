import { Routes, Route, Navigate } from 'react-router-dom'
import './styles/App.css'
import { useAuth } from './contexts/AuthContext'
import { BillProvider } from './contexts/BillContext'
import { ApplianceProvider } from './contexts/ApplianceContext'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import BillHistoryPage from './pages/BillHistoryPage'
import TrackAppliancesPage from './pages/TrackAppliancesPage'
import InsightsPage from './pages/InsightsPage'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (user === undefined) return null
  if (user === null) return <Navigate to="/" replace />
  return children
}

function App() {
  const { user } = useAuth()

  if (user === undefined) return null

  return (
    <BillProvider>
      <ApplianceProvider>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/Dashboard" replace /> : <AuthPage />} />
          <Route path="/Dashboard"       element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/BillHistory"     element={<ProtectedRoute><BillHistoryPage /></ProtectedRoute>} />
          <Route path="/TrackAppliances" element={<ProtectedRoute><TrackAppliancesPage /></ProtectedRoute>} />
          <Route path="/Insights"        element={<ProtectedRoute><InsightsPage /></ProtectedRoute>} />
          <Route path="*"                element={<Navigate to={user ? "/Dashboard" : "/"} replace />} />
        </Routes>
      </ApplianceProvider>
    </BillProvider>
  )
}

export default App
