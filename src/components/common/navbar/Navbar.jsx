import "./navbar.css";
import { showIf } from "../../utils/conditionalRendering";
import { useAuth } from "../../utils/AuthProvider";

function Navbar() {
  const { currentUser, logOut, role } = useAuth();

  return (
    <section className="navbar">
      {" "}
      {/* These can be changed, added, or removed without issue.
        As of 2/13 not hooked up. */}
      <a href="/" className="navbar-item">
        Home
      </a>
      <a href="/" className="navbar-item">
        About
      </a>
      <a href="/" className="navbar-item">
        Accounting
      </a>
      {showIf(
        currentUser && role === "admin",
        <a href="admin" className="navbar-item">
          Admin
        </a>
      )}
      <a href="/" className="navbar-item">
        Contact
      </a>
      {showIf(
        !currentUser,
        <a href="/login" className="navbar-item">
          Log On
        </a>
      )}
      {showIf(
        currentUser,
        <button
          onClick={() => logOut()}
          className="navbar-item"
          id="navbar-logout-button"
        >
          Logout
        </button>
      )}
    </section>
  );
}

export default Navbar;
