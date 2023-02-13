import "./loginPage.css";
import Box from "@mui/material/Box";
import LoginForm from "../loginForm/LoginForm";
import { Header } from "../common";


const LoginPage = () => {
  
  return (
    <Box className="screen">
      <Header className = "header" />
      <LoginForm className = "logbox" />
    </Box>
  );
};

export default LoginPage;
