import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/global/index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { ApplicationUsageLogProvider } from './contexts/ApplianceUsageLogContext.jsx'
import { ApplianceProvider } from './contexts/ApplianceContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ApplianceProvider>
          <ApplicationUsageLogProvider>
            <App />
          </ApplicationUsageLogProvider>
        </ApplianceProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
