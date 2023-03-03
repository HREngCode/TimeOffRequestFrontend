//General Imports
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

//Context Imports
import { EmployeeProvider } from "./context/EmployeeContext";
import { EmployeeInfoProvider } from "./context/EmployeeInfoProvider";
import { SupervisorInfoProvider} from "./context/SupervisorInfoProvider";
import { RequestInfoProvider } from "./context/RequestInfoProvider";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <EmployeeProvider>
          <SupervisorInfoProvider>
              <RequestInfoProvider>
                <App />
              </RequestInfoProvider>
          </SupervisorInfoProvider>
        </EmployeeProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
