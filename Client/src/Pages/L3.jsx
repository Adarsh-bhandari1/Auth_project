// Level 3 – Google OAuth Authentication
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const L3 = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/profile", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch {
        // Not logged in — silently ignore
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/logout", {
        method: "GET",
        credentials: "include",
      });
      setUser(null);
      setMsgType("info");
      setMessage("You've been signed out successfully.");
    } catch (error) {
      setMsgType("error");
      setMessage("Error logging out: " + error.message);
    }
  };

  const displayName = user?.displayName || user?.username || user?.emails?.[0]?.value || "User";
  const photoUrl = user?.photos?.[0]?.value;
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="page">
      <div className="card">
        {/* Header */}
        <div className="logo-wrap">
          <div className="logo-icon">✨</div>
          <span className="logo-text">Auth Project</span>
        </div>
        <div className="level-badge">🌐 Level 03</div>

        {loading ? (
          <>
            <div className="spinner" />
            <h2 className="card-title">Checking session…</h2>
            <p className="card-subtitle">Please wait a moment.</p>
          </>
        ) : user ? (
          /* ── Logged in state ── */
          <>
            {photoUrl ? (
              <img src={photoUrl} alt="Profile" className="avatar" />
            ) : (
              <div className="avatar-placeholder">{initial}</div>
            )}
            <div className="google-badge">
              <GoogleIcon /> Signed in with Google
            </div>
            <h2 className="card-title">Welcome, {displayName}!</h2>
            <p className="card-subtitle">
              You're authenticated via Google OAuth 2.0.
            </p>
            <button id="logout-btn" className="btn btn-primary" onClick={handleLogout}>
              Sign Out
            </button>
            <button id="go-home-btn" className="btn btn-secondary" onClick={() => navigate("/")}>
              Back to Home
            </button>
          </>
        ) : (
          /* ── Logged out state ── */
          <>
            <h2 className="card-title">Google OAuth</h2>
            <p className="card-subtitle">
              Sign in with your Google account for a fast, secure, and password-free experience.
            </p>
            <button id="google-login-btn" className="btn btn-google" onClick={handleGoogleLogin}>
              <GoogleIcon />
              Continue with Google
            </button>
            <div className="divider">or</div>
            <button id="back-home-btn" className="btn btn-secondary" onClick={() => navigate("/")}>
              Back to Home
            </button>
          </>
        )}

        {message && <div className={`msg msg-${msgType}`}>{message}</div>}
      </div>
    </div>
  );
};

export default L3;
