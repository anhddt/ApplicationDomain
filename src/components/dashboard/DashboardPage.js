import "../homePage/home.css";
import "../utils/themeProvider/themeProvider.css";
import { useThemeProvider } from "../utils/themeProvider/CustomThemeProvier";
import { Header } from "../common";
import Homebar from "../common/header/Homebar";
import { Box } from "@mui/material";
import QuickRatio from "./ratio/QuickRatio";
import CurrentRatio from "./ratio/CurrentRatio";
import CashBalance from "./cashFlow/CashBalance";
const DashboardPage = () => {
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          pt: "100px",
        }}
      >
        <Box
          sx={{
            elevation: 2,
            boxShadow: 7,
            width: "800px",
            gap: "10px",
            p: "10px",
            height: "430px",
            display: "flex",
            ustifyContent: "center",
            alignItems: "center",
            backgroundColor:
              theme === "dark" ? "rgba(255, 255, 255, 0.08)" : "white",
            borderRadius: "10px",
          }}
        >
          <Box sx={{ gap: "10px", display: "flex", flexDirection: "column" }}>
            <QuickRatio />
            <CurrentRatio />
          </Box>
          <CashBalance />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
