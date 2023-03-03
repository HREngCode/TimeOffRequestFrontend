//General Imports
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";

//Context Imports
import { EmployeeInfoContext } from "../../context/EmployeeInfoContext";

const SupervisorValid = () => {
    const {employeeIsSupervisor} = useContext(EmployeeInfoContext);
    const navigate = useNavigate();

    if(employeeIsSupervisor){
        <a onClick={() => navigate("/supervisor")}></a>
    }
    else{
        <Alert>You Do Not Have Access To This Screen</Alert>;
        <a onClick={() => navigate("/home")}></a>
    }
    return ( 
        console.log(employeeIsSupervisor)
     );
}
 
export default SupervisorValid;