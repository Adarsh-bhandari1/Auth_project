// Level 2 – Credential Authentication
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const L2 = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState(""); // "success" | "error"
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMsgType("success");
        setMessage("✓  Login successful! " + (data.msg || ""));
      } else {
        setMsgType("error");
        setMessage("✕  " + (data.message || "Invalid credentials. Please try again."));
      }
    } catch (error) {
      setMsgType("error");
      setMessage("✕  Network error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        {/* Header */}
        <div className="logo-wrap">
          <div className="logo-icon">🛡️</div>
          <span className="logo-text">Auth Project</span>
        </div>
        <div className="level-badge">🔑 Level 02</div>
        <h2 className="card-title">Sign In</h2>
        <p className="card-subtitle">
          Enter your credentials to access your account securely.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="l2-username">Username</label>
            <input
              id="l2-username"
              className="form-input"
              type="text"
              placeholder="your@email.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="l2-password">Password</label>
            <div style={{ position: "relative" }}>
              <input
                id="l2-password"
                className="form-input"
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                style={{ paddingRight: 48 }}
              />
              <button
                type="button"
                onClick={() => setShowPw((p) => !p)}
                style={{
                  position: "absolute",
                  right: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 16,
                  color: "var(--text-muted)",
                  padding: 0,
                  lineHeight: 1,
                }}
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            id="login-btn"
            className="btn btn-primary"
            type="submit"
            disabled={loading || !username || !password}
            style={{ opacity: (loading || !username || !password) ? 0.65 : 1 }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        {/* Message */}
        {message && <div className={`msg msg-${msgType}`}>{message}</div>}

        <button className="back-link" onClick={() => navigate("/")}>← Back to Home</button>
      </div>
    </div>
  );
};

export default L2;
