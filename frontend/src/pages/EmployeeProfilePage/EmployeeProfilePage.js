//General Imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";

//Component Imports
import Navbar from "../../components/NavBar/NavBar"

//Hooks Imports
import useAuth from '../../hooks/useAuth';



const EmployeeProfilePage = (props) => {
    // setting up hooks a good place to start
    const [user, token] = useAuth ();
    const navigate = useNavigate ();
    const [employee, setEmployee] = useState();
    const {employeeId} = useParams();
    const [employeeNumber, setEmployeeNumber] = useState('');
    const [employeeName, setEmployeeName] = useState();
    const [employeeLastName, setEmployeeLastName] = useState();
    const [department, setDepartment] = useState('');
    const [supervisorNumber, setSupervisorNumber] = useState('');
    const [userId, setUserId] = useState('');
    const [hireDate, setHireDate] = useState();
    const [ptoBalance, setPtoBalance] = useState('');
    const [active, setActive] = useState('');
    const [isSupervisor, setIsSupervisor] = useState('');
    const [isAdmin, setIsAdmin] = useState('');


    useEffect(() => {
        const fetchEmployeeInfo = async () => {
            try {
                let response = await axios.get(
                    `http://127.0.0.1:8000/api/employees/${employeeId}/`
                )
            setEmployee(response.data);
            setEmployeeNumber(response.data.employee_number);             
            setEmployeeName(response.data.employee_first_name); 
            setEmployeeLastName(response.data.employee_last_name); 
            setDepartment(response.data.department); 
            setSupervisorNumber(response.data.supervisor_number);
            setUserId(response.data.user.id)
            setHireDate(response.data.hire_date); 
            setPtoBalance(response.data.pto_balance); 
            setActive(response.data.active); 
            setIsSupervisor(response.data.isSupervisor); 
            setIsAdmin(response.data.isAdmin); 
            } catch (error) {
            console.log(error.response.data);
            } 
        };
        fetchEmployeeInfo();
    }, [token, user, employeeId, active]);        

    const updateEmployeeInfo = async (changeEmployeeInfo) => {
        try 
        {
            let response = await axios.put(`http://127.0.0.1:8000/api/employees/${employeeId}/`, changeEmployeeInfo, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }) 
            navigate("/")
        }        
        catch (error) 
        {
            console.log(error.message)
        }
    }    

    function handleSubmit(event){
        event.preventDefault();
        let changeEmployeeInfo = {
            id: employeeId,
            employee_number: employeeNumber,
            employee_first_name: employeeName,
            employee_last_name: employeeLastName,
            department: department,
            supervisor_number: supervisorNumber,
            user_id: userId,
            hire_date: hireDate,
            pto_balance: ptoBalance,
            active: active,
            isSupervisor: isSupervisor,
            isAdmin: isAdmin   
        };
        updateEmployeeInfo(changeEmployeeInfo)
    } 

    const makeActive = {
        active: true,
    };
    
    const handleActive = async () => {
       await axios.patch(`http://127.0.0.1:8000/api/employees/pto_balance/${employeeId}/`, makeActive)
       navigate("/")
      };

    const makeInactive = {
        active: false,
    };
    
    const handleInactive = async () => {
       await axios.patch(`http://127.0.0.1:8000/api/employees/pto_balance/${employeeId}/`, makeInactive)
       navigate("/")
      };
    
    const handleDelete = async () => {
       await axios.delete(`http://127.0.0.1:8000/api/employees/${employeeId}/`)
       navigate("/")
      };

    return ( 
        <div><Navbar />
            <div className='request-table'>
                <form onSubmit={handleSubmit}>
                {/* <form> */}
                    {/* <div className='newEntry'>
                    <label>Employee Id: </label>
                    <input type="number" value={employeeId} onChange={(event) => setEmployeeId(event.target.value)}/>
                    </div> */}
                    <div className='newEntry'>
                    <label><b>Employee Number: </b> </label>
                    <input value={employeeNumber} onChange={(event) => setEmployeeNumber(event.target.value)}/>
                    </div>
                    <div className='newEntry'>
                    <label><b>Employee First Name: </b> </label>
                    <input value={employeeName} onChange={(event) => setEmployeeName(event.target.value)}/>
                    </div>
                    <div className='newEntry'>
                    <label><b>Employee Last Name: </b> </label>
                    <input value={employeeLastName} onChange={(event) => setEmployeeLastName(event.target.value)}/>
                    </div>
                    <div className='newEntry'>
                    <label><b>Department:</b> </label>
                    <input value={department} onChange={(event) => setDepartment(event.target.value)}/>
                    </div>
                    <div className='newEntry'>
                    <label><b>Supervisor Number: </b> </label>
                    <input value={supervisorNumber} onChange={(event) => setSupervisorNumber(event.target.value)}/>
                    </div>
                    <div className='newEntry'>
                    <label><b>Hire Date: </b> </label>
                    <input type="date" value={hireDate} onChange={(event) => setHireDate(event.target.value)}/>
                    </div>
                    <div className='newEntry'>
                    <label><b>PTO Balance: </b> </label>
                    <input type="number" value={ptoBalance} onChange={(event) => setPtoBalance(event.target.value)}/>
                    </div>
                    <div className='newEntry'>
                    <label><b>Active: </b> </label>
                    <input type="boolean" value={active} onChange={(event) => setActive(event.target.value)}/>
                    </div>
                    <div className='newEntry'>
                    <label><b>Supervisor: </b> </label>
                    <input type="boolean" value={isSupervisor} onChange={(event) => setIsSupervisor(event.target.value)}/>
                    </div>
                    <div className='newEntry'>
                    <label><b>Admin:</b></label>
                    <input type="boolean" value={isAdmin} onChange={(event) => setIsAdmin(event.target.value)}/>
                    </div>
                    <div>{props.employeeData.isAdmin?
                    (<div className='admin-buttons'>
                        <div>
                        <button type='submit'>Update</button>
                        </div>
                    </div>):(<div><h3>YOU ARE NOT AUTHORIZED TO MAKE CHANGES</h3></div>)}
                    </div>
                </form>
                <div>{props.employeeData.isAdmin?
                (<div className='admin-buttons-center' >
                        <div>
                        <button onClick={handleActive}>Active</button>
                        </div>
                        <div>
                        <button onClick={handleInactive}>Inactive</button>
                        </div>
                        <div>
                        <button onClick={handleDelete}>Delete</button>
                        </div>
                </div>):(<div><h3>RETURN TO THE PREVIOUS PAGE</h3></div>)}
                </div>
            </div>
        </div>
    );
}
export default EmployeeProfilePage;