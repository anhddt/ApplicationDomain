import "./header.css";
import { Navbar } from "../../common";
import { useAuth } from "../../utils/AuthProvider";
import LogoIcon from "../logo/LogoIcon";

function Header() {
  const { firstName, currentUser } = useAuth();

  return (
    <section className="header">
      {/* Logo and Name */}
      <section className="header-top_left">
        <section className="header-top_logo">
          {" "}
          {/* Logo location */}
          <LogoIcon />
        </section>
        <section className="header-top_right">
          {" "}
          {/* Log On button location  */}
          {currentUser ? `Welcome ${firstName}` : "Welcome"}
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
