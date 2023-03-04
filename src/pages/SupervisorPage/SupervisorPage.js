//General Imports
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { URL_HOST } from "../../urlHost";

//Component Imports
import Navbar from "../../components/NavBar/NavBar";
import FullCal from "../../components/FullCalendar/FullCal";

//Context Imports

const SupervisorPage = (props) => {
    
    const [user, token] = useAuth ()
    const navigate = useNavigate();
    const [approval, setApproval] = useState(false);
    const [ptoRequests, setPtoRequests] = useState([]);

    useEffect(() => { 

        const fetchRequestBySupervisor = async () => {
            try {
            //calls current employee number. If it's a supervisor, the value returned will be the employees that 
            //report to this number
           
            let response = await axios.get(`${URL_HOST}/api/pto_requests/supervisor/${props.employeeData.employee_number}/`, { 
                headers: {
                Authorization: "Bearer " + token,
                },
            });
            setPtoRequests(response.data);
            setApproval(response.data.approved);
            } catch (error) {
            console.log(error.response);
            }    
        }; 
        fetchRequestBySupervisor() ;

    }, [token, user, props.employeeData.employee_number]); 

    const handleClick = (ptoRequest) => {
        navigate(`/timeoffrequestsup/${ptoRequest.id}`);
      }

    const ptoApprove = {
        approved: true,
    };
    
    const handleApprovalToggle = async (ptoRequest) => {
       await axios.patch(`${URL_HOST}/api/pto_requests/approval/${ptoRequest.id}/`, ptoApprove)
       alert(`You have approved the request for ${ptoRequest.id} `)
      };

    return ( 
        <div><Navbar />
            <div>
                <div>{props.employeeData.isSupervisor?
                (<div> 
                    <div className="title-homepage">
                        <h1>Supervisor Page for {" " + props.employeeData.department}!</h1></div>
                        <div className="flex-container">
                        {ptoRequests &&
                        ptoRequests.map((ptoRequest) => (
                        <p key={ptoRequest.id}>
                            <p><b>Request ID:</b> {ptoRequest.id} </p>
                            <p><b>Requester:</b>  {ptoRequest.employee.employee_first_name} {ptoRequest.employee.employee_last_name}</p>
                            <p><b>Date Requested:</b>   {ptoRequest.date_requested}</p>                
                            <p><b>Hours Requested:</b>   {ptoRequest.hours_requested}</p>
                            <button onClick={() => handleClick(ptoRequest)}>Detail</button> 
                            <button onClick={() => handleApprovalToggle(ptoRequest)}>Approve</button>
                        </p>
                        ))}
                        </div>
                        <div className="calendar">
                            <FullCal ptoRequests= {ptoRequests} />
                        </div>
                        </div>) : (<div><h3><b>You Do Not Have Supervisor Access</b></h3></div>) }
                </div>
            </div>
        </div>
     );
}
 
export default SupervisorPage;