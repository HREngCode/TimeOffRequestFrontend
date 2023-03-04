//3. Wrap App
//4. Import and use (destructure) any context you feel necessary
// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";
import React, { useContext, useEffect, useState } from 'react';
import useAuth from "./hooks/useAuth";
import axios from "axios";
import { URL_HOST } from "./urlHost";

// Pages Imports
import SupervisorPage from "./pages/SupervisorPage/SupervisorPage";
import NewTimeOffRequestPage from "./pages/NewTimeOffRequestPage/NewTimeOffRequestPage";
import TimeOffRequestDataPage from "./pages/TimeOffRequestDataPage/TimeOffRequestDataPage";
import TimeOffRequestDataSupPage from "./pages/TimeOffRequestDataSupPage/TimeOffRequestDataSupPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import EmployeeProfilePage from "./pages/EmployeeProfilePage/EmployeeProfilePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import RegisterEePage from "./pages/RegisterEePage/RegisterEePage";
import AdminPage from "./pages/AdminPage/AdminPage";

// Component Imports
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Context Imports

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  const [user, token] = useAuth();
  const [employeeData, setEmployeeData] = useState('');
  const [employeeSupervisor, setEmployeeSupervisor] = useState('');
  
  useEffect(() => {
    const fetchEmployeeInfo = async () => {
      try {
      //Gets employee information from the user id
      let response = await axios.get(`${URL_HOST}/api/employees/user/${user.id}/`, {
        headers: {
        Authorization: "Bearer " + token,
        },
      });
      //Gets employee supervisor information
      let response2 = await axios.get(`${URL_HOST}/api/employees/employee_number/${response.data.supervisor_number}/`, {
        headers: {
        Authorization: "Bearer " + token,
        }, 
        }
      );
      console.log("Home Page Loaded",response.data);
      console.log("Supervisor Info Loaded",response2.data);
      setEmployeeData(response.data);
      setEmployeeSupervisor(response2.data);
      } catch (error) {
        console.log(error.message);
      }    
    };
    fetchEmployeeInfo();
    console.log(employeeData)
  }, [token, user, employeeData.id]);

  return (
    <div>
      <Header />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage employeeData={employeeData}/>
                {/* {employee ? <HomePage /> : <Route path="/registerEe" element={<RegisterEePage />} /> } */}
              </PrivateRoute>
            }
          />
          <Route path="/registerEe" element={<RegisterEePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/newtimeoffrequest" element={<NewTimeOffRequestPage employeeData={employeeData}/>} />
          {/*Employee Profile & Time Off Request Page using a Param */}
          <Route path="/employeeprofile/:employeeId" element={<EmployeeProfilePage employeeData={employeeData}/>} />
          <Route path="/timeoffrequest/:ptoRequestId" element={<TimeOffRequestDataPage employeeData={employeeData}/>} />
          <Route path="/timeoffrequestsup/:ptoRequestId" element={<TimeOffRequestDataSupPage employeeData={employeeData}/>} />
          <Route path="/supervisor" element={<SupervisorPage employeeData={employeeData}/>} />
          <Route path="/admin" element={<AdminPage employeeData={employeeData}/>} />
        </Routes>
      <Footer />
    </div>
  ); 
}

export default App;
