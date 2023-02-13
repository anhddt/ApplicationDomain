import { Navigate } from "react-router-dom"
import { auth } from "../../firebase";

export const PrivateRoute = ({ children }) => {
  if (!auth.currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
