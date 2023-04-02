import "./navbar.css";
import { showIf } from "../../utils/conditionalRendering";
import { useAuth } from "../../utils/AuthProvider";
import { NavLink } from "react-router-dom";
import ReactCalendarIcon from "../calendar/ReactCalendarIcon";
import { Typography } from "@mui/material";

function Navbar() {
  const { currentUser, role } = useAuth();
  return (
    <section className="navbar">
      {" "}
      <ReactCalendarIcon size="large" fontSize="large" view="month" />
      {/* These can be changed, added, or removed without issue.
        As of 2/13 not hooked up. */}
      <NavLink to="/" className="navbar-item">
        <Typography variant="subtitle1">Home</Typography>
      </NavLink>
      <NavLink to="/" className="navbar-item">
        <Typography variant="subtitle1">About</Typography>
      </NavLink>
      {currentUser && (
        <NavLink to="/accounts" className="navbar-item">
          <Typography variant="subtitle1">Accounting</Typography>
        </NavLink>
      )}
      {showIf(
        currentUser && role === "admin",
        <NavLink to="/admin" className="navbar-item">
          <Typography variant="subtitle1">Admin</Typography>
        </NavLink>
      )}
      <NavLink to="/" className="navbar-item">
        <Typography variant="subtitle1">Contact</Typography>
      </NavLink>
    </section>
  );
}

export default Navbar;
