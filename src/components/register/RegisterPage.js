import { Box } from "@mui/material";
import RegisterForm from "./RegisterForm";
import Homebar from "../common/header/Homebar";

/**
 * That's it!
 * @returns
 */
const RegisterPage = () => {
  return (
    <Box>
      <Homebar />
      <RegisterForm />
    </Box>
  );
};

export default RegisterPage;
