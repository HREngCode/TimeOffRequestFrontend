//General Imports
import React, { useState, useContext } from "react";

//Context Imports
import AuthContext from "../../context/AuthContext";

//Hooks Imports
import useCustomForm from "../../hooks/useCustomForm";

const RegisterPage = () => {
  
  const { registerUser } = useContext(AuthContext);
  
  const defaultValues = {
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  };
  
  //passing registerUser as a function and is considered the callback
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser,
  );
  
  
  return (
    <div className="title-homepage"><h2><b>USER REGISTRATION</b></h2>
    <div className="submit-new-request">

      {/*handleSubmit is called from the hook up above*/}
      <form className="form" onSubmit={handleSubmit}> 
        <label><b>
          Username:
        </b>
          {" "}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <b>
           Password: 
          </b>
          {" "}
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <b>
            Email:
          </b>
          {" "}
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <b>
           First Name: 
          </b>
          {" "}
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <b>
            Last Name:
          </b>
          {" "}
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </label>
        <p style={{ fontSize: "12px" }}>
          <i>NOTE: Make this an uncommon password with characters, numbers, and
          special characters!</i>
        </p>
        <button>Register!</button>
      </form>
    </div>
    </div>
  );
};

export default RegisterPage;
