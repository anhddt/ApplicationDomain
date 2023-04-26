import "./navbar.css";
import { showIf } from "../../utils/conditionalRendering";
import { useAuth } from "../../utils/AuthProvider";
import { NavLink } from "react-router-dom";
import ReactCalendarIcon from "../calendar/ReactCalendarIcon";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

function Navbar() {
  const { currentUser, role } = useAuth();
  const { pathname } = useLocation();
  return (
    <section className="navbar">
      {" "}
      <ReactCalendarIcon
        id2="menu-item-header-calendar"
        id1="lidup-icon-header-calendar"
        size="large"
        fontSize="large"
        view="month"
      />
      {/* These can be changed, added, or removed without issue.
        As of 2/13 not hooked up. */}
      <NavLink
        to="/"
        className={pathname === "/" ? "navbar-item-active" : "navbar-item"}
      >
        <Typography variant="subtitle1">Home</Typography>
      </NavLink>
      <NavLink
        to="/about"
        className={pathname === "/about" ? "navbar-item-active" : "navbar-item"}
      >
        <Typography variant="subtitle1">About</Typography>
      </NavLink>
      {currentUser && (
        <NavLink
          to="/dashboard"
          className={
            pathname === "/dashboard" ? "navbar-item-active" : "navbar-item"
          }
        >
          <Typography variant="subtitle1">Dashboard</Typography>
        </NavLink>
      )}
      {currentUser && (
        <NavLink
          to="/accounts"
          state={{ showItem: "Chart of accounts" }}
          className="navbar-item"
        >
          <Typography variant="subtitle1">Accounting</Typography>
        </NavLink>
      )}
      {showIf(
        currentUser && role === "admin",
        <NavLink to="/admin" className="navbar-item">
          <Typography variant="subtitle1">Admin</Typography>
        </NavLink>
      )}
      <NavLink
        to="/contact"
        className={
          pathname === "/contact" ? "navbar-item-active" : "navbar-item"
        }
      >
        <Typography variant="subtitle1">Contact</Typography>
      </NavLink>
    </section>
  );
}

export default Navbar;
