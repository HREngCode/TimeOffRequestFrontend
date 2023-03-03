//General Imports
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

//Context Imports
import AuthContext from "../../context/AuthContext";

//Hooks Imports
import useCustomForm from "../../hooks/useCustomForm";

//Pages Imports
import "./LoginPage.css";

//Components Imports
// import Header from "../../components/Header/Header";
// import Navbar from "../../components/NavBar/NavBar";

const LoginPage = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };

  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser,
  );

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [reset, isServerError]);

  return (
    <div>
      <div>
        <div className="grid-container">
          <div className="title"></div><h1><b>Login</b></h1>
          <form className="form" onSubmit={handleSubmit}>
            <label><b>
              Username:</b>{" "}
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </label>
            <label><b>
              Password:</b>{" "}
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </label>
            {isServerError ? (
              <p className="error">Login failed, incorrect credentials!</p>
            ) : null}
            <Link to="/register">Click to register!</Link>
            <button>Login!</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
