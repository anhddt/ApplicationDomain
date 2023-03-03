import "./profilePage.css";
import "../utils/themeProvider/themeProvider.css";
import { useThemeProvider } from "../utils/themeProvider/CustomThemeProvier";
import { Box, Paper } from "@mui/material";
import Homebar from "../common/header/Homebar";
import ContactCard from "./ContactCard";
import AccountCard from "./AccountCard";

const ProfilePage = () => {
  const { theme } = useThemeProvider();
  return (
    <Paper>
      <Homebar />
      <Box
        className="profile-page-container"
        id={theme === "dark" ? "paper-dark" : "paper-light"}
      >
        <ContactCard />
        <AccountCard />
      </Box>
    </Paper>
  );
};

export default ProfilePage;
