import { Navigate } from "react-router-dom"
import { auth } from "../../firebase";

const PrivateRoute = ({ children }) => {
  if (!auth.currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;