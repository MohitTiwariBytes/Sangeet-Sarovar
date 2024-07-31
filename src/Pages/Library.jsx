import { React, useEffect } from "react";
import SideBar from "../Components/SideBar";
import "./Library.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { ref, child, get } from "firebase/database";
import { db, auth } from "../Configs/firebaseConfig";

const Library = () => {
  function getUserData(userId) {
    const dbRef = ref(db);
    get(child(dbRef, `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log(data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getUser() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        getUserData(uid);
      } else {
        window.location.replace("/login");
      }
    });
  }

  useEffect(() => {
    getUser();
  }, []);
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
        </div>
      </div>
    </div>
  );
};

export default Library;
