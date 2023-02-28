import "./home.css";
import { Header } from "../common";
import Homebar from "../common/header/Homebar";
import { Box } from "@mui/material";

const HomePage = () => {
  return (
    <Box className="home-container">
      <Box className="home-page-header">
        <Header />
      </Box>
      <Box className="home-page-homebar">
        <Homebar />
      </Box>
    </Box>
  );
};

export default HomePage;
