import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import L1 from "./L1";
import "../Css/style.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Auth Project</h1>
      <button onClick={() => navigate("/level1")}>Level 1</button>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/level1" element={<L1 />} />
      {/* <Route path="/Level2" element={<L2/>}/>    not implemented yet */}
    </Routes>
  );
}

export default App;
