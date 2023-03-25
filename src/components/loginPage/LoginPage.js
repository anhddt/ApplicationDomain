import LoginForm from "./LoginForm";
import Homebar from "../common/header/Homebar";
import { Paper } from "@mui/material";
/**
 * That's it!
 * @returns
 */
const LoginPage = () => {
  return (
    <Paper>
      <Homebar />
      <LoginForm />
    </Paper>
  );
};

export default LoginPage;
