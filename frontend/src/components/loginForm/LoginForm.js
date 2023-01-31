import "./loginForm.css";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";

const LoginPage = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <FormControl class="login-form">
        <Typography id="login-form-message" variant="h4">Welcome</Typography>
        <TextField label="Username" variant="outlined" required />
        <TextField label="Password" variant="outlined" required />
        <Button color="primary" variant="contained" disabled={isDisabled}>Login</Button>
    </FormControl>
  );
}

export default LoginPage;