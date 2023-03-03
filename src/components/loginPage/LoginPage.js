import LoginForm from "./LoginForm";
import Homebar from "../common/header/Homebar";
import { Paper } from "@mui/material";
const LoginPage = () => {
  return (
    <Paper>
      <Homebar />
      <LoginForm />
    </Paper>
  );
};

export default LoginPage;
