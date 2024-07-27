import React, { useState } from "react";
import "./SideBar.css";

const Sidebar = () => {
  const [activeText, setActiveText] = useState("Home");
  const text = localStorage.getItem("activeText");

  const handleTextClick = (text) => {
    setActiveText(text);
    if (text.toLowerCase() === "home") {
      window.location.href = "/";
    } else if (text.toLowerCase() === "your library") {
      window.location.href = "/library";
    } else {
      window.location.replace(`/${text.toLowerCase()}`);
    }
    localStorage.setItem("activeText", text);
  };

  return (
    <div className="main-sidebar">
      <div className="sidebar">
        <div className="header">
          <h1>संगीत सरोवर</h1>
        </div>
        <div className="top">
          <div className="items">
            <h1
              className={text === "Home" ? "activeText" : ""}
              onClick={() => handleTextClick("Home")}
            >
              <i className="fa-solid fa-house"></i> Home
            </h1>
            <h1
              className={text === "Search" ? "activeText" : ""}
              onClick={() => handleTextClick("Search")}
            >
              <i className="fa-solid fa-magnifying-glass"></i> Search
            </h1>
          </div>
        </div>
        <div className="medium">
          <div className="items">
            <h1
              className={text === "Your Library" ? "activeText" : ""}
              onClick={() => handleTextClick("Your Library")}
            >
              <i className="fa-solid fa-heart"></i> Your Library
            </h1>
            <h1
              className={text === "Downloads" ? "activeText" : ""}
              onClick={() => handleTextClick("Downloads")}
            >
              <i className="fa-solid fa-download"></i> Downloads
            </h1>
          </div>
        </div>
        <div className="bottom">
          <div className="items">
            <h1
              className={text === "Help" ? "activeText" : ""}
              onClick={() => handleTextClick("Help")}
            >
              <i className="fa-solid fa-circle-info"></i> Help
            </h1>
            <h1
              className={text === "Settings" ? "activeText" : ""}
              onClick={() => handleTextClick("Settings")}
            >
              <i className="fa-solid fa-gear"></i> Settings
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
