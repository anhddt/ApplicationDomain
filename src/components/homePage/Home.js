import "./home.css";
import "../utils/themeProvider/themeProvider.css";
import { useThemeProvider } from "../utils/themeProvider/CustomThemeProvier";
import { Header } from "../common";
import Homebar from "../common/header/Homebar";
import { Box } from "@mui/material";
/**
 * Home page, still under development
 * @returns
 */
const HomePage = () => {
  const { theme } = useThemeProvider();
  return (
    <Box
      className="home-container"
      id={theme === "dark" ? "paper-dark" : "paper-light"}
    >
      <Box className="home-page-header">
        <Header />
      </Box>
      <Box className="home-page-mini-header">
        <Homebar />
      </Box>
    </Box>
  );
};

export default HomePage;
