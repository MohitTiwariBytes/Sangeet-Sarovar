import React, { useState } from "react";
import "./Login.css";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, signInWithEmailAndPassword} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import firebase from "firebase/compat/app";

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
  const db = getDatabase()

  const [isLoggedIn, setIsLoggedIn] = useState(null);

  function writeUserData(userId, email, username) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      userID: userId,
      email: email,
      username: username
    }).then(() => {
      window.location.href = "/";
    }).catch((error) => {
      console.error("Error writing user data: ", error);
    });
  }

  function createANewUserEmail(email, password, username) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        alert("User created");
        writeUserData(user.uid, email, username);
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

  function signInUserEmail(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        alert("User logged in", user.uid);
        console.log(user.uid)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  const handleEmailSignUp = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;
    createANewUserEmail(email, password, username);
  };

  const handleEmailLogin = () =>{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signInUserEmail(email, password);
  }

  const handleModeChange = () =>{
    setMode(!mode);
  }

  const [mode, setMode] = useState(false)

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="leftLogin">
          <div className="login">
            <h1>Sign-Up</h1>
            <div className="inputs">
              <input id="email" type="text" placeholder="Email" />
              <input style={{display: mode ? "none" : "block"}} id="username" type="name" placeholder="Username" />
              <input id="password" type="password" placeholder="Password" />
            </div>
            <div className="switchLogin">
              <a onClick={handleModeChange} style={{ color: "black" }} href="#">{mode ? "Do not have any account? Sign up!" : "Already have any account? Sign in!"}</a>
            </div>
            <div className="loginBtn">
              <button style={{display: mode ? "none" : "block"}} onClick={handleEmailSignUp} id="loginBtn">Sign-Up</button>
              <button style={{display: mode ? "block" : "none"}} onClick={handleEmailLogin} id="loginBtn">Login</button>
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
