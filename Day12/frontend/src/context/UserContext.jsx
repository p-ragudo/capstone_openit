import { createContext, useContext, useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ email: null });
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/manage/info`, { credentials: "include" })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("not authenticated");
      })
      .then((data) => {
        setUser({ email: data.email });
        setIsLoggedIn(true);
      })
      .catch(() => {})
      .finally(() => setIsChecking(false));
  }, []);

  if (isChecking) return null;

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
