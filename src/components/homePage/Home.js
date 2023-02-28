import "./home.css";
import { Header } from "../common";
import MiniHeader from "../common/header/MiniHeader";
import { Box } from "@mui/material";

const HomePage = () => {
  return (
    <Box className="home-container">
      <Box className="home-page-header">
        <Header />
      </Box>
      <Box className="home-page-mini-header">
        <MiniHeader />
      </Box>
    </Box>
  );
};

export default HomePage;
