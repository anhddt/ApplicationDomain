import "./logo.css";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const LogoIcon = () => {
  return (
    <NavLink to="/" id="logo-link">
      <Logo />
    </NavLink>
  );
};
export default LogoIcon;
