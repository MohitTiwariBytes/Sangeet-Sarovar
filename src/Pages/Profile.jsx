import React, { useEffect } from "react";
import "./Profile.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";

const Profile = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyClZgByercTJQ-ywVmX2SfyEeZG_DXgrVY",
    authDomain: "muse-dc3c5.firebaseapp.com",
    projectId: "muse-dc3c5",
    storageBucket: "muse-dc3c5.appspot.com",
    messagingSenderId: "218996834414",
    appId: "1:218996834414:web:16e333dcd7c85d831ea67f",
    measurementId: "G-NBXDGNPY8P",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

  function getUser() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(user.uid);
        // ...
      } else {
        // User is signed out
        // ...
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
          <div className="name">{name}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
