import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import EmployeeContext from "../context/EmployeeContext";

const useAuth = () => {
  const { employee } = useContext(EmployeeContext);
  const { user, token } = useContext(AuthContext);
  return [ user, token, employee ];
};

export default useAuth;
