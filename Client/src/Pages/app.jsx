import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import L1 from "./L1";
import L2 from "./L2";
import L3 from "./L3";
import OAuthCallback from "./OAuthCallback";
import "../Css/style.css";

function Home() {
  const navigate = useNavigate();

  const levels = [
    {
      icon: "🔐",
      num: "Level 01",
      title: "Password Hashing",
      desc: "Hash passwords client-side using bcrypt with configurable salt rounds.",
      path: "/level1",
      id: "nav-level1",
    },
    {
      icon: "🛡️",
      num: "Level 02",
      title: "Credential Auth",
      desc: "Username & password login with secure server-side session management.",
      path: "/level2",
      id: "nav-level2",
    },
    {
      icon: "✨",
      num: "Level 03",
      title: "Google OAuth",
      desc: "One-click sign-in via Google OAuth 2.0 powered by Passport.js.",
      path: "/level3",
      id: "nav-level3",
    },
  ];

  return (
    <div className="page">
      <div className="home-hero">
        <h1>Auth Project</h1>
        <p>
          Explore three levels of modern web authentication — from basic hashing
          to social OAuth flows.
        </p>
      </div>

      <div className="levels-grid">
        {levels.map((l) => (
          <div
            key={l.path}
            id={l.id}
            className="level-card"
            onClick={() => navigate(l.path)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate(l.path)}
          >
            <span className="lc-icon">{l.icon}</span>
            <div className="lc-num">{l.num}</div>
            <div className="lc-title">{l.title}</div>
            <div className="lc-desc">{l.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/level1" element={<L1 />} />
      <Route path="/level2" element={<L2 />} />
      <Route path="/level3" element={<L3 />} />
      <Route path="/auth/callback" element={<OAuthCallback />} />
    </Routes>
  );
}

export default App;
