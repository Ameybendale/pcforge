import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container auth-page">
      <div className="auth-box">
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit}>
          <label className="mono">
            Email
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="mono">
            Password
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          {error && <p className="mono error-text">{error}</p>}
          <button className="auth-btn mono" disabled={loading}>
            {loading ? "SIGNING IN…" : "SIGN IN"}
          </button>
        </form>
        <p className="auth-switch mono">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </section>
  );
}
