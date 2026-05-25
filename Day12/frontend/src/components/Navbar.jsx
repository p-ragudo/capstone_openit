import { useUserContext } from "../context/UserContext";
import { logout } from "../services/authService";

export default function Navbar() {
    const { isLoggedIn, user, setIsLoggedIn, setUser } = useUserContext();

    const handleLogout = async () => {
        await logout();
        setIsLoggedIn(false);
        setUser({ email: null });
    };

    return (
        <div className="navbar">
            <h2>Enrollment System</h2>
            <span>OpenIT Summer Bootcamp</span>
            {isLoggedIn && (
                <div className="navbar-auth">
                    <span className="navbar-user">{user.email}</span>
                    <button type="button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
