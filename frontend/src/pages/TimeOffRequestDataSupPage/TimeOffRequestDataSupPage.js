//General Imports
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom"

//Component Imports
import Navbar from "../../components/NavBar/NavBar";

//Hooks Imports
import useAuth from '../../hooks/useAuth';

const UpdatedTimeOffRequestPage = (props) => {
    // setting up hooks a good place to start
    const {ptoRequestId} = useParams();
    const [user, token] = useAuth ();
    const navigate = useNavigate ();
    const [ptoRequest, setPtoRequest] = useState({});
    const [dateRequested, setDateRequested] = useState('');
    const [hoursRequested, setHoursRequested] = useState('');
    const [requesterName, setRequesterName] = useState(' ');
    const [ptoBalance, setPtoBalance] = useState('')
    // const [approved, setApproved] = useState('');

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                let response = await axios.get(
                    `http://127.0.0.1:8000/api/pto_requests/request/${ptoRequestId}/`
                )
                setPtoRequest(response.data)
                setDateRequested(response.data.date_requested)
                setHoursRequested(response.data.hours_requested)
                setRequesterName(response.data.employee.employee_first_name + " " + response.data.employee.employee_last_name)
                setPtoBalance(response.data.employee.pto_balance)
                console.log(ptoRequestId)
                // setApproved(response.data.approved)
            } catch (error) {
                console.log(error)
            }
        }
        fetchRequest()
    }, [token, user, props, ptoRequestId]);  

    const updateTimeOffRequest = async (changeTimeOffRequest) => {
        try 
        {
            await axios.put(`http://127.0.0.1:8000/api/pto_requests/update/${ptoRequestId}/`, changeTimeOffRequest, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            if(props.employeeData.isSupervisor === true) {
                navigate("/supervisor")
            }
            else if(props.employeeData.isAdmin === true){
                navigate("/admin")
            }
            else {
                navigate("/")
            }
            
            
        } 
        catch (error) 
        {
            console.log(error.message)
        }
    }    

    function handleSubmit(event){
        event.preventDefault();
        let changeTimeOffRequest = {
            employee_id: ptoRequest.employee.id,
            date_requested: dateRequested,
            hours_requested: hoursRequested,
            // approved: approved,        
        };
        updateTimeOffRequest(changeTimeOffRequest)
    } 

    const ptoApprove = {
        approved: true,
    };
    
    const handleApprovalToggle = async () => {
       await axios.patch(`http://127.0.0.1:8000/api/pto_requests/approval/${ptoRequestId}/`, ptoApprove)
       alert(`You have approved the request for ${ptoRequest.id} `)
       navigate("/supervisor")
      };

    const handleDelete = async () => {
        await axios.delete(`http://127.0.0.1:8000/api/pto_requests/${ptoRequestId}/`)
        navigate("/supervisor")
       };

    return ( 
        <div><Navbar />
            <div className='request-table'>
                <form onSubmit={handleSubmit}>
                    <div className='newEntry'>
                    <label><b>Employee Name: </b></label>
                    {requesterName}
                    </div>
                    <div className='newEntry'>
                    <label><b>Date Requested Off: </b></label>
                    <input type="date" value={dateRequested} onChange={(event) => setDateRequested(event.target.value)}/>
                    </div>
                    <div className='newEntry'>
                    <label><b>Hours Requested: </b></label>
                    <input type="number" value={hoursRequested} onChange={(event) => setHoursRequested(event.target.value)}/>
                    </div>
                    <div className='newEntry'>
                    <label><b>PTO Balance: </b></label>
                    {ptoBalance}
                    </div>
                    {/* <div className='newEntry'>
                    <label> Approved: </label>
                    <input type="boolean" value={approved} onChange={(event) => setApproved(event.target.value)}/>
                    </div> */}
                    <div>
                            <div className='admin-buttons-center' >
                                <div>
                                <button type='submit'>Update</button>
                                </div>
                                <div>
                                <button onClick={handleApprovalToggle}>Approve</button>
                                </div>
                                <div> 
                                <button onClick={handleDelete}>Delete</button>
                                </div>
                            </div>           
                    </div>
                </form>
            </div>
        </div>
    );
}
export default UpdatedTimeOffRequestPage;