import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <div className="left">
          <div className="login">
            <h1>Login</h1>
            <div className="inputs">
              <input type="text" placeholder="Email" />
              <input type="password" placeholder="Password" />
            </div>
            <div className="loginBtn">
              <button id="loginBtn">Login</button>
            </div>
            <div className="providers">
              <button id="google">
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
