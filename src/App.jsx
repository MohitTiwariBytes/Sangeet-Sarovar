import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import Help from "./Pages/Help";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Library from "./Pages/Library";
import Downloads from "./Pages/Downloads";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/help" element={<Help />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/library" element={<Library />} />
        <Route path="/downloads" element={<Downloads />} />{" "}
      </Routes>
      <div className="mobile-message">
        The mobile version of this app is coming soon!
      </div>
    </BrowserRouter>
  );
}

export default App;
