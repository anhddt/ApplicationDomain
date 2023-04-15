import "./header.css";
import "../../utils/themeProvider/themeProvider.css";
import { useThemeProvider } from "../../utils/themeProvider/CustomThemeProvier";
import { Box, Typography } from "@mui/material";
import { Navbar } from "../../common";
import { useAuth } from "../../utils/AuthProvider";
import { showIf } from "../../utils/conditionalRendering";
import LogoIcon from "../logo/LogoIcon";
import CustomProfileIcon from "../profile/CustomProfileIcon";
import LoginDropDownIcon from "../profile/LoginDropDownIcon";
function Header() {
  const { firstName, currentUser } = useAuth();
  const { theme } = useThemeProvider();
  return (
    <section
      className="header"
      id={theme === "dark" ? "bar-dark" : "bar-light"}
    >
      {/* Logo and Name */}
      <section className="header-top_logo">
        {/* Logo location */}
        <Box flexGrow={1}>
          <LogoIcon />
        </Box>
        {/* If the user is not logged in, show welcome.
        If they logged in show Hello + their first name */}
        <Typography variant="subtitle1">
          {currentUser ? `Hello ${firstName}!` : "Welcome!"}
        </Typography>
        {/* Custom profile icon, show if user is logged in, or not*/}
        {showIf(
          currentUser,
          <CustomProfileIcon
            id2="profile-expand-chevron-not-menu"
            id1="profile-icon-not-menu"
          />
        )}
        {/* If the user is not logged in show the below instead */}
        {showIf(
          !currentUser,
          <LoginDropDownIcon
            id2="profile-expand-chevron-not-menu"
            id1="profile-icon-not-menu"
          />
        )}
      </section>
      <section className="header-bottom_navbar">
        {/* <Navbar />*/}
        <Navbar />
      </section>
    </section>
  );
}

export default Header;
