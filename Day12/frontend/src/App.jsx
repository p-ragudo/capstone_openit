import { StudentProvider } from './context/StudentContext';
import { UserProvider, useUserContext } from './context/UserContext';
import StudentsPage from './pages/StudentsPage';
import AuthPage from './pages/AuthPage';

function AppContent() {
  const { isLoggedIn } = useUserContext();
  return isLoggedIn ? <StudentsPage /> : <AuthPage />;
}

export default function App() {
  return (
    <UserProvider>
      <StudentProvider>
        <AppContent />
      </StudentProvider>
    </UserProvider>
  );
}
