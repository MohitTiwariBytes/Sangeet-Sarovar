import React from "react";
import SideBar from "../Components/SideBar";
import "./Library.css";

const Library = () => {
  const data = [
    {
      id: 0,
      name: "Song Name",
      artist: "Artist Name",
      album: "Album Name",
      url: "Song URL",
    },
    {
      id: 0,
      name: "Song Name",
      artist: "Artist Name",
      album: "Album Name",
      url: "Song URL",
    },
  ];
  return (
    <div className="library-main">
      <div className="sidebarSide">
        <SideBar></SideBar>
      </div>
      <div className="libraryMain">
        <div className="library">
          <div className="library-header">
            <h1>Your Library</h1>
          </div>
          <div className="library-content">
            <div className="main-card">
              {data.map((song) => (
                <div key={song.id} className="card">
                  <div className="name">
                    <h1>{song.name}</h1>
                    <h2>{song.artist_name}</h2>
                    <img src={song.album_image} alt={song.name} />
                  </div>
                  <div className="button">
                    <button onClick={() => handlePlay(song)}>Play</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
