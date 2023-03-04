// General Imports
import React, { useContext, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "../../App.css";
import axios from "axios";
import {useNavigate, Link } from 'react-router-dom';
import { URL_HOST } from "../../urlHost";

// Component Imports
import Navbar from "../../components/NavBar/NavBar";
import FullCal from "../../components/FullCalendar/FullCal";


const HomePage = (props) => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const [ptoRequests, setPtoRequests] = useState([]);


  useEffect(() => {

    if(props.employeeData.id)
    {
          const fetchPtoRequestByEmployee = async () => {//add async before parenthensis ahead of the arrow function
          try {
            let response = await axios.get(`${URL_HOST}/api/pto_requests/employee/${props.employeeData.id}/`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          setPtoRequests(response.data);
          console.log(props)
          } catch (error) {
            console.log(error.response);
          }    
        }; 
      fetchPtoRequestByEmployee();
    }

  }, [props.employeeData.id]);//optional array to make sure this only runs once

  

  const handleClick = (ptoRequest) => {
    navigate(`/timeoffrequest/${ptoRequest.id}`);
  }

  return (
    <div><Navbar />
      <div className="title-homepage">
        <h1>Home Page for {props.employeeData.employee_first_name + " " + props.employeeData.employee_last_name}!</h1>
        <div>
          <div className="calendar">
                <FullCal ptoRequests= {ptoRequests} />
          </div>
            <div className="flex-container">
              {/* Javascript Map Function can generate multiple components from an array of data */}
              {ptoRequests &&
              ptoRequests.map((ptoRequest) => (
                <p key={ptoRequest.id}>
                  <p><b>Request Number:</b>{" " + ptoRequest.id}</p>
                  <p><b>Date Requested:</b>{" " + ptoRequest.date_requested}</p>
                  <p><b>Hours Requested:</b> {" " + ptoRequest.hours_requested}</p>
                  <p><b>Approved:</b> {" " + ptoRequest.approved}</p>
                  <div></div>
                  <button onClick={() => handleClick(ptoRequest)}>Detail</button>
                </p>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
