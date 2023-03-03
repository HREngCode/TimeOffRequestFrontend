//General Imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom"

//Component Imports
import Navbar from "../../components/NavBar/NavBar";
import FullCal from '../../components/FullCalendar/FullCal';

//Hooks Imports
import useAuth from '../../hooks/useAuth';



const NewTimeOffRequestPage = (props) => {
    // setting up hooks a good place to start
    const [user, token] = useAuth ()
    const navigate = useNavigate ()
    const [supervisorName, setSupervisorName] = useState('')
    const [dateRequested, setDateRequested] = useState('')
    const [hoursRequested, setHoursRequested] = useState('')
    const [approved, setApproved] = useState('')
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        const fetchEmployeeInfo = async () => {
            try {
            let response = await axios.get(`http://127.0.0.1:8000/api/employees/user/${props.employeeData.user.id}/`, {
                headers: {
                Authorization: "Bearer " + token,
                },
            }
            )
            
                let response2 = await axios.get(`http://127.0.0.1:8000/api/employees/employee_number/${response.data.supervisor_number}/`, {
                headers: {
                Authorization: "Bearer " + token,
                }, 
                }
            )
            console.log("First call", response)
            console.log("Second call", response2)
            setBalance(response.data.pto_balance) 
            setSupervisorName(response2.data.employee_first_name + " " + response2.data.employee_last_name); 
            setApproved("No");
            } catch (error) {
            console.log(error.response.data);
            } 
        };
        fetchEmployeeInfo();
    }, [token, user, props.employeeData.id]);        

    const addTimeOffRequest = async (newTimeOffRequest) => {
        try 
        {
            let response = await axios.post('http://127.0.0.1:8000/api/pto_requests/new/', newTimeOffRequest, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }) 
            navigate("/");
            await handleUpdateBalance(updatedPtoBalance);
        } 
        catch (error) 
        {
            console.log(error.message)
        }
    } 
    
    let updateBalance = balance - hoursRequested
    const updatedPtoBalance = {
        pto_balance: updateBalance,
    };
    
    const handleUpdateBalance = async (updatedPtoBalance) => {
       await axios.patch(`http://127.0.0.1:8000/api/employees/pto_balance/${props.employeeData.id}/`, updatedPtoBalance)
      };

    function handleSubmit(event){
        event.preventDefault();
        let newTimeOffRequest = {
            employee_id: props.employeeData.id,
            date_requested: dateRequested,
            hours_requested: hoursRequested,
            approved: approved,        
        };
        addTimeOffRequest(newTimeOffRequest)
    } 

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
                        <label><b>Employee Number: </b></label>
                        {props.employeeData.employee_number}
                        </div>
                        <div className='newEntry'>
                        <label><b>Employee Name: </b></label>
                        {props.employeeData.employee_first_name + " " + props.employeeData.employee_last_name}
                        </div>
                        <div className='newEntry'>
                        <label><b>Department:</b> </label>
                        {props.employeeData.department}
                        </div>
                        <div className='newEntry'>
                        <label><b>Hire Date: </b></label>
                        {props.employeeData.hire_date}
                        </div>
                        <div className='newEntry'>
                        <label><b>PTO Balance:</b> </label>
                        {props.employeeData.pto_balance}
                        </div>
                        <div className='newEntry'>
                        <label><b>Supervisor Name:</b></label>
                        {supervisorName}
                        </div>
                        <div className='newEntry'>
                        <label><b>Date Requested Off: </b></label>
                        <input type="date" value={dateRequested} onChange={(event) => setDateRequested(event.target.value)}/>
                        </div>
                        <div className='newEntry'>
                        <label><b>Hours Requested: </b></label>
                        <input type="number" value={hoursRequested} onChange={(event) => setHoursRequested(event.target.value)}/>
                        </div>
                        {/* <div className='newEntry'>
                        <label> Approved: </label>
                        {props.employee.approved}
                        </div> */}
                        <div className='submit-new-request'>
                        <button type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
                <div>
                    {/* <FullCal /> */}
                </div>
            </div>
        );
}
export default NewTimeOffRequestPage;