import LoginForm from "./LoginForm";
import Homebar from "../common/header/Homebar";
import { Box } from "@mui/material";
const LoginPage = () => {
  return (
    <Box>
      <Homebar />
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
