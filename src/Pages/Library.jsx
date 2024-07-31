import React, { useEffect, useState } from "react";
import SideBar from "../Components/SideBar";
import "./Library.css";
import { onAuthStateChanged } from "firebase/auth";
import { ref, child, get } from "firebase/database";
import { db, auth } from "../Configs/firebaseConfig";

const Library = () => {
  const [songs, setSongs] = useState([]);

  const getUserData = (userId) => {
    const dbRef = ref(db);
    get(child(dbRef, `users/${userId}/library/songs`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const songList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setSongs(songList);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        getUserData(uid);
      } else {
        window.location.replace("/login");
      }
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="library-main">
      <div className="sidebarSide">
        <SideBar />
      </div>
      <div className="libraryMain">
        <div className="library">
          <div className="library-header">
            <h1>Your Library</h1>
          </div>
          <div className="song-cards">
            {songs.length > 0 ? (
              songs.map((song) => (
                <div key={song.id} className="card">
                  <div className="name">
                    <h1>{song.name}</h1>
                    <h2>{song.artist}</h2>
                    <img src={song.album} alt={song.name} />
                  </div>
                </div>
              ))
            ) : (
              <p>No songs in your library.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
