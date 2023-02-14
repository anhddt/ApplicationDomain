import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";

export const PrivateRoute = ({ children }) => {
  const user = useAuth();
  console.log(user);
  if (user) {
    console.log("user");
    return children;
  }else {
    return <Navigate to="/login" replace />;
  }
};
