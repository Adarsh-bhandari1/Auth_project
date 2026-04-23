// OAuthCallback.jsx
// Landing page after Google OAuth redirects back to the frontend.
// Immediately calls /profile to verify the session, then shows the result.
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GoogleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:3000/profile", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:3000/logout", { credentials: "include" });
    navigate("/level3");
  };

  /* ── Loading ──────────────────────────── */
  if (status === "loading") {
    return (
      <div className="page">
        <div className="card" style={{ textAlign: "center" }}>
          <div className="spinner" />
          <h2 className="card-title">Authenticating…</h2>
          <p className="card-subtitle">
            Please wait while we verify your Google account.
          </p>
        </div>
      </div>
    );
  }

  /* ── Error ────────────────────────────── */
  if (status === "error") {
    return (
      <div className="page">
        <div className="card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>⚠️</div>
          <h2 className="card-title">Authentication Failed</h2>
          <p className="card-subtitle">
            We couldn't verify your Google account. Please try again.
          </p>
          <button
            id="retry-google-btn"
            className="btn btn-primary"
            onClick={() => navigate("/level3")}
          >
            Try Again
          </button>
          <button
            id="go-home-error-btn"
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  /* ── Success ──────────────────────────── */
  const displayName =
    user?.displayName || user?.username || user?.emails?.[0]?.value || "User";
  const photoUrl = user?.photos?.[0]?.value;
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="page">
      <div className="card" style={{ textAlign: "center" }}>
        {/* Avatar */}
        {photoUrl ? (
          <img src={photoUrl} alt="Profile" className="avatar" />
        ) : (
          <div className="avatar-placeholder">{initial}</div>
        )}

        {/* Google badge */}
        <div className="google-badge">
          <GoogleIcon /> Signed in with Google
        </div>

        <h2 className="card-title">Welcome, {displayName}!</h2>
        <p className="card-subtitle">
          You have successfully authenticated via Google OAuth 2.0.
        </p>

        <button
          id="go-home-btn"
          className="btn btn-primary"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>

        <button
          id="logout-btn"
          className="btn btn-secondary"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default OAuthCallback;
