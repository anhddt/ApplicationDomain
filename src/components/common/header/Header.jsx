import "./header.css";
import { Navbar } from "../../common";
import { useAuth } from "../../utils/AuthProvider";
import Logo from "../logo/Logo";

function Header() {
  const { username, currentUser } = useAuth();

  return (
    <section className="header">
      {/* Logo and Name */}
      <section className="header-top_left">
        <section className="header-top_logo">
          {" "}
          {/* Logo location */}
          <Logo />
        </section>
        <section className="header-top_right">
          {" "}
          {/* Log On button location  */}
          {currentUser ? `Welcome ${username}` : "Welcome"}
        </section>
      </section>

      <section className="header-bottom">
        <section className="header-bottom_navbar">
          {/* <Navbar />*/}
          <Navbar />
        </section>
      </section>
    </section>
  );
}

export default Header;
