import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";

/**
 * This is a custom build encapsulation
 * of a component
 * It verifies if the user is authorized
 * before showing them the component that they
 * want to navigate to
 * back to login page if they are not authorized
 */
export const PrivateRoute = ({ children }) => {
  const user = useAuth();
  const location = useLocation();
  if (user) {
    return children;
  }else {
    return <Navigate to="/login" replace state={{from: location}} />;
  }
};
