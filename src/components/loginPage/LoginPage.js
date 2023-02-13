import "./loginPage.css";
import Box from "@mui/material/Box";
import LoginForm from "../loginForm/LoginForm";
import { Header } from "../common";


const LoginPage = () => {
  
  return (
    <Box className="screen">
      <Header />
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
