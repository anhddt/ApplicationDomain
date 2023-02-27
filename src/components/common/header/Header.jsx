import "./header.css";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../common";
import { useAuth } from "../../utils/AuthProvider";
import { showIf } from "../../utils/conditionalRendering";
import LogoIcon from "../logo/LogoIcon";
import CustomProfileIcon from "../profile/CustomProfileIcon";

function Header() {
  const { firstName, currentUser } = useAuth();
  const navigateTo = useNavigate();
  return (
    <section className="header">
      {/* Logo and Name */}
      <section className="header-top_left">
        <section className="header-top_logo">
          {/* Logo location */}
          <LogoIcon />
        </section>
        <section className="header-top_right">
          {/* If the user is not logged in, show welcome.
          If they logged in show Hello + their first name */}
          {currentUser ? `Hello ${firstName}!` : "Welcome!"}
          {/* Custom profile icon, show if user is logged in, or not*/}
          {showIf(currentUser, <CustomProfileIcon />)}
          {/* If the user is not logged in show the below instead */}
          {showIf(
            !currentUser,
            <Box sx={{ marginLeft: "1rem" }} display="flex" flexDirection="row">
              <Button
                size="small"
                color="success"
                variant="contained"
                onClick={() => {
                  navigateTo("/login");
                }}
              >
                Sign in
              </Button>
              <Box sx={{ marginLeft: "1rem" }}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => {
                    navigateTo("/register");
                  }}
                >
                  Register
                </Button>
              </Box>
            </Box>
          )}
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
