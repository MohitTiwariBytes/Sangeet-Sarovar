import React, { useEffect, useState } from "react";
import "./Login.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../Configs/firebaseConfig";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const gitProvider = new GithubAuthProvider();

  const [isLoggedIn, setIsLoggedIn] = useState(null);

  function writeUserData(userId, email, username) {
    set(ref(db, "users/" + userId), {
      userID: userId,
      email: email,
      username: username,
    })
      .then(() => {
        window.location.href = "/profile";
      })
      .catch((error) => {
        console.error("Error writing user data: ", error);
      });
  }

  function createANewUserEmail(email, password, username) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("User created");
        writeUserData(user.uid, email, username);
      })
      .catch((error) => {
        alert(error.code);
      });
  }

  function createUserWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        writeUserData(user.uid, user.email);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        alert(error.code);
        setIsLoggedIn(false);
      });
  }

  function createANewUserGithub() {
    signInWithPopup(auth, gitProvider)
      .then((result) => {
        const user = result.user;
        alert("User created!");
        writeUserData(user.uid, user.email);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        alert(error.code);
        setIsLoggedIn(false);
      });
  }

  function signInUserEmail(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("User logged in", userCredential.user.uid);
      })
      .catch((error) => {
        alert(error.code);
      });
  }

  const handleEmailSignUp = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;
    createANewUserEmail(email, password, username);
  };

  const handleEmailLogin = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signInUserEmail(email, password);
  };

  const handleModeChange = () => {
    setMode(!mode);
  };

  const [mode, setMode] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        window.location.href = "/profile";
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="leftLogin">
          <div className="login">
            <h1>Sign-Up</h1>
            <div className="inputs">
              <input id="email" type="text" placeholder="Email" />
              <input
                style={{ display: mode ? "none" : "block" }}
                id="username"
                type="name"
                placeholder="Username"
              />
              <input id="password" type="password" placeholder="Password" />
            </div>
            <div className="switchLogin">
              <a onClick={handleModeChange} style={{ color: "black" }} href="#">
                {mode
                  ? "Do not have any account? Sign up!"
                  : "Already have any account? Sign in!"}
              </a>
            </div>
            <div className="loginBtn">
              <button
                style={{ display: mode ? "none" : "block" }}
                onClick={handleEmailSignUp}
                id="loginBtn"
              >
                Sign-Up
              </button>
              <button
                style={{ display: mode ? "block" : "none" }}
                onClick={handleEmailLogin}
                id="loginBtn"
              >
                Login
              </button>
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
