import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

function Home() {
  return <div className="container py-4">Calendar will be here</div>;
}

function AddEvent() {
  return <div className="container py-4">Add Event will be here</div>;
}

export default function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddEvent />} />
      </Routes>
    </div>
  );
}
