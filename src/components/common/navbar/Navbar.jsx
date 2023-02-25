import "./navbar.css";
import { showIf } from "../../utils/conditionalRendering";
import { useAuth } from "../../utils/AuthProvider";
import { NavLink } from "react-router-dom";

function Navbar() {
  const { currentUser, role } = useAuth();

  return (
    <section className="navbar">
      {" "}
      {/* These can be changed, added, or removed without issue.
        As of 2/13 not hooked up. */}
      <NavLink to="/" className="navbar-item">
        Home
      </NavLink>
      <NavLink to="/" className="navbar-item">
        About
      </NavLink>
      <NavLink to="/" className="navbar-item">
        Accounting
      </NavLink>
      {showIf(
        currentUser && role === "admin",
        <NavLink to="admin" className="navbar-item">
          Admin
        </NavLink>
      )}
      <NavLink to="/" className="navbar-item">
        Contact
      </NavLink>
    </section>
  );
}

export default Navbar;
