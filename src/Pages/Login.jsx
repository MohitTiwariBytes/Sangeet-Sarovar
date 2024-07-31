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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mode, setMode] = useState(false); // false: Sign-Up mode, true: Sign-In mode

  // Initialize providers for Google and GitHub authentication
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  // Helper function to write user data to Firebase
  const writeUserData = (userId, email, username = "DefaultUser") => {
    console.log("Writing data for user:", { userId, email, username });
    set(ref(db, `users/${userId}`), {
      userID: userId,
      email: email,
      username: username,
    });
    set(ref(db, `users/${userId}/library`), {
      songs: {
        song1: "song1",
        song2: "song2",
        song3: "song3",
      },
    })
      .then(() => console.log("Data written successfully"))
      .catch((error) => console.error("Error writing user data: ", error));
  };

  // Function to handle email and password user creation
  const handleEmailSignUp = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("User created");
        writeUserData(user.uid, email, username);
      })
      .catch((error) => alert(error.code));
  };

  // Function to handle Google sign-in
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        writeUserData(user.uid, user.email, user.displayName || "GoogleUser");
        setIsLoggedIn(true);
      })
      .catch((error) => {
        alert(error.code);
        setIsLoggedIn(false);
      });
  };

  // Function to handle GitHub sign-in
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        writeUserData(user.uid, user.email, user.displayName || "GitHubUser");
        setIsLoggedIn(true);
      })
      .catch((error) => {
        alert(error.code);
        setIsLoggedIn(false);
      });
  };

  // Function to handle email sign-in
  const handleEmailLogin = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) =>
        alert("User logged in", userCredential.user.uid)
      )
      .catch((error) => alert(error.code));
  };

  // Toggle between sign-up and sign-in modes
  const toggleMode = () => setMode((prevMode) => !prevMode);

  // Monitor authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        // Redirect to profile after a delay
        setTimeout(() => {
          window.location.replace("/profile");
        }, 3000);
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
            <h1>{mode ? "Sign-In" : "Sign-Up"}</h1>
            <div className="inputs">
              <input id="email" type="text" placeholder="Email" />
              {!mode && (
                <input id="username" type="text" placeholder="Username" />
              )}
              <input id="password" type="password" placeholder="Password" />
            </div>
            <div className="switchLogin">
              <a onClick={toggleMode} href="#" style={{ color: "black" }}>
                {mode
                  ? "Do not have an account? Sign up!"
                  : "Already have an account? Sign in!"}
              </a>
            </div>
            <div className="loginBtn">
              {!mode && (
                <button onClick={handleEmailSignUp} id="loginBtn">
                  Sign-Up
                </button>
              )}
              {mode && (
                <button onClick={handleEmailLogin} id="loginBtn">
                  Login
                </button>
              )}
            </div>
            <div className="providers">
              <button onClick={handleGoogleSignIn} id="google">
                <i className="fa-brands fa-google fa-2x"></i>
              </button>
              <button onClick={handleGithubSignIn} id="github">
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
