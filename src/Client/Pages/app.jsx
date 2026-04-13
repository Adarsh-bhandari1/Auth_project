import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import L1 from "./L1";
import L2 from "./L2";
import "../Css/style.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="h1_style">Auth Project</h1>
      <div className="container">
        <button onClick={() => navigate("/level1")}>Level 1</button>
        <button onClick={() => navigate("/level2")}>Level 2</button>
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
    </Routes>
  );
}

export default App;
