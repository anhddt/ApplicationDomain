import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const LogoIcon = () => {
    return (
        <NavLink to="/">
            <Logo />
        </NavLink>
    );
}
export default LogoIcon;