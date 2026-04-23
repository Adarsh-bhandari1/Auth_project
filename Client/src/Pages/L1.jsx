// Level 1 – Password Hashing (bcryptjs)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

function L1() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [saltRounds, setSaltRounds] = useState(10);
  const [hashedPassword, setHashedPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleHash = async () => {
    if (!password.trim()) return;
    setLoading(true);
    // Use async promise-based version so UI stays responsive
    try {
      const hash = await bcrypt.hash(password, Number(saltRounds));
      setHashedPassword(hash);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (hashedPassword) navigator.clipboard.writeText(hashedPassword);
  };

  return (
    <div className="page">
      <div className="card">
        {/* Header */}
        <div className="logo-wrap">
          <div className="logo-icon">🔐</div>
          <span className="logo-text">Auth Project</span>
        </div>
        <div className="level-badge">⚡ Level 01</div>
        <h2 className="card-title">Password Hashing</h2>
        <p className="card-subtitle">
          Enter a password below and bcrypt will generate a secure, salted hash.
        </p>

        {/* Password input */}
        <div className="form-group">
          <label className="form-label" htmlFor="l1-password">Password</label>
          <input
            id="l1-password"
            className="form-input"
            type="password"
            placeholder="Enter your password…"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleHash()}
          />
        </div>

        {/* Salt rounds */}
        <div className="form-group">
          <label className="form-label" htmlFor="l1-salt">
            Salt Rounds — <strong style={{ color: "var(--accent-2)" }}>{saltRounds}</strong>
          </label>
          <input
            id="l1-salt"
            className="form-input"
            type="range"
            min={6}
            max={14}
            value={saltRounds}
            onChange={(e) => setSaltRounds(e.target.value)}
            style={{ padding: "8px 0", background: "transparent", cursor: "pointer" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
            <span>Fast (6)</span><span>Secure (14)</span>
          </div>
        </div>

        {/* Actions */}
        <button
          id="hash-btn"
          className="btn btn-primary"
          onClick={handleHash}
          disabled={loading || !password.trim()}
          style={{ opacity: (!password.trim() || loading) ? 0.6 : 1 }}
        >
          {loading ? "Hashing…" : "Generate Hash"}
        </button>

        {/* Hash result */}
        {hashedPassword && (
          <div className="hash-box">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span className="hash-label">bcrypt Hash</span>
              <button
                onClick={handleCopy}
                style={{
                  background: "rgba(108,99,255,0.25)",
                  border: "none",
                  borderRadius: 6,
                  color: "var(--accent-2)",
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "3px 10px",
                  cursor: "pointer",
                  letterSpacing: "0.4px",
                }}
              >
                Copy
              </button>
            </div>
            <code className="hash-value">{hashedPassword}</code>
          </div>
        )}

        <button className="back-link" onClick={() => navigate("/")}>← Back to Home</button>
      </div>
    </div>
  );
}

export default L1;
