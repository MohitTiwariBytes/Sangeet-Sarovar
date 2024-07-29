import React, { useEffect } from "react";
import "./Profile.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { ref, child, get } from "firebase/database";
import { auth, db } from "../Configs/firebaseConfig";

const Profile = () => {
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
          console.log(snapshot.val());
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
        alert("I don't think you are logged in, LOGIN~!~!~!~!~~");
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
          <button onClick={signOutUser}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
