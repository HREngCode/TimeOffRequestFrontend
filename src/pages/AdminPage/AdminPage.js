//General Imports
import React, { useContext, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import {useNavigate, Link} from 'react-router-dom';

//Component Imports
import Navbar from "../../components/NavBar/NavBar";

const AdminPage = (props) => {

    const [user, token] = useAuth ()
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchAllEmployees = async () => {//add async before parenthensis ahead of the arrow function
            try {
            let response = await axios.get(`http://127.0.0.1:8000/api/employees/all/`, {
                headers: {
                Authorization: "Bearer " + token,
                },
            });
            setEmployees(response.data);
            } catch (error) {
            console.log(error.response);
            }    
        };
        fetchAllEmployees();
    
    }, [token, user, props.employeeData.id]);//optional array to make sure this only runs once    

    const handleClick = (employee) => {
        navigate(`/employeeprofile/${employee.id}/`);
      }

    return ( 
        <div><Navbar />
            <div>{props.employeeData.isAdmin? 
                (<div className="title-homepage"> 
                    <h1>Admin Page!</h1>
                    <div className="container-flex-admin">
                    {employees &&
                    employees.map((employee) => (
                    <p key={employee.id}>
                       <p><b>Employee Number:</b>{employee.employee_number}</p> 
                        <p><b>Employee Name:</b>{employee.employee_first_name + " " + employee.employee_last_name}</p>
                        <button onClick={() => handleClick(employee)}>Edit</button>
                    {/* <Link to={`/employeeprofile/${employee.id}`} >{employee.employee_first_name} {employee.employee_number}</Link>  */}
                    </p>    
                    ))}
                    </div>  
                </div>) : (<div><h3><b>You Do Not Have Admin Access</b></h3></div>) }
            </div>
        </div>
     );
}
 
export default AdminPage;