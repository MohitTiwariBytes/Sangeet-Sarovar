import React, { useEffect, useState } from "react";
import "./Profile.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { ref, child, get } from "firebase/database";
import { auth, db } from "../Configs/firebaseConfig";

const Profile = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [userID, setUserID] = useState(null);

  function signOutUser() {
    signOut(auth)
      .then(() => {
        console.log("Logged out!");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getUserData(userId) {
    const dbRef = ref(db);
    get(child(dbRef, `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setName(data.username);
          setEmail(data.email);
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
        setUserID(uid);
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
    <div className="profile-main">
      <div className="profile">
        <div className="topProfile">
          <div className="name">
            <h1 style={{ color: "white" }}>{name}</h1>
            <p style={{ color: "white" }}>{email}</p>
          </div>
          <button id="logoutBtn" onClick={signOutUser}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
