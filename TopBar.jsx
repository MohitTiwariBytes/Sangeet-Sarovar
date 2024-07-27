import React, { useState } from "react";
import "./TopBar.css";

const TopBar = () => {
  const [activeGenre, setActiveGenre] = useState("All");

  const handleGenreClick = (genre) => {
    setActiveGenre(genre);
  };

  return (
    <div className="main-topbar">
      <div className="topbar">
        <div className="genre">
          {["All", "Pop", "Rock", "Jazz", "Country"].map((genre) => (
            <span
              key={genre}
              className={activeGenre === genre ? "active" : ""}
              onClick={() => handleGenreClick(genre)}
            >
              {genre}
            </span>
          ))}
        </div>
      </div>

      <div className="userProfile">
        <i
          onClick={() => {
            window.location.replace("login");
          }}
          className="fa-solid fa-user fa-2x"
        ></i>
      </div>
    </div>
  );
};

export default TopBar;
