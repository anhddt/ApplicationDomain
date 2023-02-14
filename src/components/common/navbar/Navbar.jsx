import "./navbar.css";
import { showIf } from "../../utils/conditionalRendering";
import { useAuth } from "../../utils/AuthProvider";
import { logOut } from "../../../utilities/utils";

function Navbar () {
    const user = useAuth();
    return (
        <section className="navbar"> {
        /* These can be changed, added, or removed without issue.
        As of 2/13 not hooked up. */}
            <a href="/" className="navbar-item">Home</a>
            <a href="/" className="navbar-item">About</a>
            <a href="/" className="navbar-item">Accounting</a>
            <a href="admin" className="navbar-item">Admin</a>
            <a href="/" className="navbar-item">Contact</a>
            {showIf(!user,
                <a href="/login" className="navbar-item">Log On</a>
            )}
            {showIf(user,
                <button onClick={() => logOut()} className="navbar-item" id="navbar-logout-button">Logout</button>
            )}
        </section>
    )
};

export default Navbar;