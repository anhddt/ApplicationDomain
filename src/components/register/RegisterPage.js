import { Box } from "@mui/material";
import RegisterForm from "./RegisterForm";
import Homebar from "../common/header/Homebar";
import { useThemeProvider } from "../utils/themeProvider/CustomThemeProvier";

/**
 * That's it!
 * @returns
 */
const RegisterPage = () => {
  const { theme } = useThemeProvider();
  return (
    <Box
      className="container"
      id={theme === "dark" ? "paper-dark" : "paper-light"}
    >
      <Homebar />
      <Box
        sx={{
          minHeight: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          placeItems: "center",
          pt: "5%",
        }}
      >
        <RegisterForm page="register" />
      </Box>
    </Box>
  );
};

export default RegisterPage;
