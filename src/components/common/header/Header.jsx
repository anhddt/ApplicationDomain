import { useEffect, useState } from "react";
import "./header.css";
import { Navbar } from "../../common";
import { getUserName } from "../../../middleware/verification/userInfo";

function Header() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const gettingUsername = async () => {
      const userName = await getUserName();
      setUsername(userName);
    };
    gettingUsername();
  });

  return (
    <section className="header">
      {/* Logo and Name */}
      <section className="header-top_left">
        <section className="header-top_logo">
          {" "}
          {/* Logo location */}
          <img
            src="https://i.imgur.com/R3761qO.png"
            alt="Accountant's Friend"
            width="500"
          />
        </section>
        <section className="header-top_right">
          {" "}
          {/* Log On button location  */}
          {`Welcome ${username}`}
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
