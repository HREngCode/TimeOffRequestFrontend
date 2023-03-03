//1. create context to be imported
//2. provide a jsx element that will provide context to children
//2a. declare a state(functionality) you need here
// import { useState } from "react";
// import useAuth from '../hooks/useAuth';
// import { EmployeeInfoContext } from "./EmployeeInfoContext";

// export const EmployeeInfoProvider = ({children}) => {
    // const [user, token] = useAuth ()
    // const [employeeUserId, setEmployeeUserId] = useState()
    // const [employee, setEmployee] = useState()
    // const [employeeName, setEmployeeName] = useState()
    // const [employeeLastName, setEmployeeLastName] = useState()
    // const [employeeId, setEmployeeId] = useState()
    // const [employeeSupervisorNumber, setEmployeeSupervisorNumber] = useState()
    // const [employeeNumber, setEmployeeNumber] = useState()
    // const [employeeIsSupervisor, setEmployeeIsSupervisor] = useState()
    // const [employeeIsAdmin, setEmployeeIsAdmin] = useState()

    // let value = {
    //     employeeUserId,
    //     setEmployeeUserId,
    //     employee,
    //     setEmployee,
    //     // employeeName,
    //     // setEmployeeName,
    //     // employeeLastName,
    //     // setEmployeeLastName,
    //     employeeId,
    //     setEmployeeId,
    //     employeeSupervisorNumber,
    //     setEmployeeSupervisorNumber,
    //     employeeNumber, 
    //     setEmployeeNumber,
    //     employeeIsSupervisor, 
    //     setEmployeeIsSupervisor,
    //     employeeIsAdmin,
    //     setEmployeeIsAdmin, 
        // fetchEmployeeInfo,
//     }

//     //always return jsx
//     return(
//         <EmployeeInfoContext.Provider value={value}>{children}</EmployeeInfoContext.Provider>
//     )
// }