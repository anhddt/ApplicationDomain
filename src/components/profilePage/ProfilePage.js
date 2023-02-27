import "./profilePage.css";
import { Box } from "@mui/material";
import Homebar from "../common/header/Homebar";
import ContactCard from "./ContactCard";
import AccountCard from "./AccountCard";

const ProfilePage = () => {
  return (
    <Box>
      <Homebar />
      <Box className="profile-page-container">
        <ContactCard />
        <AccountCard />
      </Box>
    </Box>
  );
};

export default ProfilePage;
