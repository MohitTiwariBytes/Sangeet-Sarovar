import React, { useState } from "react";
import "./Login.css";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const Login = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyClZgByercTJQ-ywVmX2SfyEeZG_DXgrVY",
    authDomain: "muse-dc3c5.firebaseapp.com",
    projectId: "muse-dc3c5",
    storageBucket: "muse-dc3c5.appspot.com",
    messagingSenderId: "218996834414",
    appId: "1:218996834414:web:16e333dcd7c85d831ea67f",
    measurementId: "G-NBXDGNPY8P"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const gitProvider = new GithubAuthProvider();

  const [isLoggedIn, setIsLoggedIn] = useState(null);

  function writeUserData(userId, email) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      userID: userId,
      email: email,
    }).then(() => {
      window.location.href = "/";
    }).catch((error) => {
      console.error("Error writing user data: ", error);
    });
  }

  function createANewUserEmail(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        alert("User created", user);
        writeUserData(user.uid, email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode);
      });
  }

  function createUserWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        writeUserData(user.uid, user.email);
        setIsLoggedIn(true);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode);
        setIsLoggedIn(false);
      });
  }

  function createANewUserGithub() {
    signInWithPopup(auth, gitProvider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        alert("User created!");
        writeUserData(user.uid, user.email);
        setIsLoggedIn(true);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode);
        setIsLoggedIn(false);
      });
  }

  const handleEmailLogin = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    createANewUserEmail(email, password);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="leftLogin">
          <div className="login">
            <h1>Login</h1>
            <div className="inputs">
              <input id="email" type="text" placeholder="Email" />
              <input id="password" type="password" placeholder="Password" />
            </div>
            <div className="loginBtn">
              <button onClick={handleEmailLogin} id="loginBtn">Login</button>
            </div>
            <div className="providers">
              <button onClick={createUserWithGoogle} id="google">
                <i className="fa-brands fa-google fa-2x"></i>
              </button>
              <button onClick={createANewUserGithub} id="github">
                <i className="fa-brands fa-github fa-2x"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
