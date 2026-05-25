import { useState } from "react";
import { login, register } from "../services/authService";
import { useUserContext } from "../context/UserContext";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setIsLoggedIn, setUser } = useUserContext();

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        const res = await login({ email: form.email, password: form.password });
        if (res.ok) {
          setUser({ email: form.email });
          setIsLoggedIn(true);
        } else {
          setError("Invalid email or password.");
        }
      } else {
        const res = await register({ email: form.email, password: form.password });
        if (res.ok) {
          setMode("login");
          setError("");
          setForm((prev) => ({ ...prev, password: "" }));
        } else {
          const data = await res.json().catch(() => null);
          const msg = data?.errors
            ? Object.values(data.errors).flat().join(" ")
            : "Registration failed. Password must be at least 8 characters.";
          setError(msg);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{mode === "login" ? "Login" : "Register"}</h2>

        <label htmlFor="auth-email">Email</label>
        <input
          id="auth-email"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange("email")}
          required
        />

        <label htmlFor="auth-password">Password</label>
        <input
          id="auth-password"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange("password")}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
        </button>

        {error && <p className="auth-error">{error}</p>}

        <p className="auth-toggle">
          {mode === "login" ? (
            <>
              No account?{" "}
              <button type="button" onClick={() => { setMode("register"); setError(""); }}>
                Register
              </button>
            </>
          ) : (
            <>
              Have an account?{" "}
              <button type="button" onClick={() => { setMode("login"); setError(""); }}>
                Login
              </button>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
