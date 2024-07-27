import React, { useState } from "react";
import Sidebar from "../Components/SideBar";
import TopBar from "../Components/TopBar.jsx";
import BottomBar from "../Components/BottomBar.jsx";
import Card from "../Components/Card.jsx";
import "./Search.css";

const Search = () => {
  const [dataToSend, setDataToSend] = useState({
    name: "",
    artist: "",
    album: "",
    url: "",
  });
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="main-search-page">
      <div style={{ marginTop: "-150px" }} className="sideBar">
        <Sidebar />
      </div>
      <div className="main-content">
        <div className="topBar">
          <div
            style={{
              padding: "50px 0px",
              marginLeft: "-40px",
              position: "fixed",
              zIndex: 200,
              mixBlendMode: "difference",
            }}
            className="userProfile"
          >
            <i
              onClick={() => {
                window.location.replace("/login");
              }}
              className="fa-solid fa-user fa-2x"
            ></i>
          </div>
        </div>

        <div
          style={{ marginLeft: "30%", position: "absolute", top: "30%" }}
          className="searchbox"
        >
          <div className="inputMain">
            <input
              onChange={handleChange}
              type="text"
              placeholder="Search for songs, artists, or albums"
            />
            <i
              style={{
                color: "white",
                position: "absolute",
                top: "25px",
                left: "100%",
                zIndex: "100",
              }}
              className="fa-solid fa-magnifying-glass fa-2x"
            ></i>
          </div>
        </div>
        <div className="songs">
          <Card
            setDataToSend={setDataToSend}
            URL={`https://api.jamendo.com/v3.0/tracks?client_id=8428cdd9&format=json&search=${search}`}
          />
        </div>
        <div className="bottomBar">
          <BottomBar dataToSend={dataToSend} />
        </div>
      </div>
    </div>
  );
};

export default Search;
