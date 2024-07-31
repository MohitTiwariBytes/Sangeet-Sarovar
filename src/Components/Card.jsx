import React, { useEffect, useState } from "react";
import "./Card.css";
import { ref, set } from "firebase/database";
import { auth, db } from "../Configs/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const Card = ({ setDataToSend, URL }) => {
  const [data, setData] = useState(null);

  const handlePlay = (song) => {
    setDataToSend({
      name: song.name,
      artist: song.artist_name,
      album: song.album_image,
      url: song.audio,
    });
  };

  const handleAddToLibrary = (song) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const songRef = ref(db, `users/${user.uid}/library/songs/${song.id}`);
        set(songRef, {
          name: song.name,
          artist: song.artist_name,
          album: song.album_image,
          audio: song.audio,
        })
          .then(() => {
            alert("Song added to your library!");
          })
          .catch((error) => {
            console.error("Error adding song: ", error);
          });
      } else {
        window.location.replace("/login");
      }
    });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (URL) {
      getData();
    }
  }, [URL]);

  if (!data) {
    return (
      <div
        style={{
          width: "73%",
          height: "100%",
          marginTop: "100px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          color: "white",
          flexDirection: "column",
        }}
      >
        <span className="loader"></span>
        <span>Loading may take some time, Please be patient!</span>
      </div>
    );
  }

  return (
    <div className="main-card">
      {data.results.map((song) => (
        <div key={song.id} className="card">
          <div className="name">
            <h1>{song.name}</h1>
            <h2>{song.artist_name}</h2>
            <img src={song.album_image} alt={song.name} />
          </div>
          <div className="button">
            <button onClick={() => handlePlay(song)}>Play</button>
            <button
              id="addToLibraryBtn"
              onClick={() => handleAddToLibrary(song)}
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
