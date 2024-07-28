import React from "react";
import "./Login.css";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
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

  function writeUserData(userId, email) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      userID: userId,
      email: email,
    });
  }

  function createANewUserEmail(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // ...
        alert("User created", user)
        writeUserData(user.uid, email, password)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode)
        // ..
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
        // IdP data available using getAdditionalUserInfo(result)
        writeUserData(user.uid, user.email)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        alert(error.code)
        // ...
      });
  }

  const handleEmailLogin = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    createANewUserEmail(email, password)
  }



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
              <button id="github">
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
