//1. create context to be imported
//2. provide a jsx element that will provide context to children
//2a. declare a state(functionality) you need here
import { useState } from "react";
import { RequestInfoContext } from "./RequestInfoContext";

export const RequestInfoProvider = ({children}) => {
    // const [user, token] = useAuth ()
    const [ptoRequests, setPtoRequests] = useState([])
    const [ptoRequestId, setPtoRequestId] = useState( )

    let value = {
        ptoRequests,
        setPtoRequests,
        ptoRequestId,
        setPtoRequestId,
    }

    //always return jsx
    return(
        <RequestInfoContext.Provider value={value}>{children}</RequestInfoContext.Provider>
    )
}