import "./loginPage.css";
import { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { showIf } from "../utils/conditionalRendering";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { signInEmailPassword } from "../../utilities/utils";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigateTo = useNavigate();
  const isDisabled = useMemo(() => {
    return email === "" || password === "";
  }, [email, password]);

  const handleLogin = () => {
    signInEmailPassword(email, password, navigateTo, setErrorMessage);
  };

  return (
    <Box className="screen">
      <Box className="login-form">
        <Typography id="login-form-message" variant="h4">
          Welcome
        </Typography>
        <Box>
          Not a member?{" "}
          <NavLink
            to="/register"
            component="button"
            underline="hover"
            variant="subtitle1"
          >
            Create Account
          </NavLink>
        </Box>
        {showIf(
          errorMessage.length > 0,
          <Typography color="red">{errorMessage}</Typography>
        )}
        <Box className="field-container">
          <PersonOutlineOutlinedIcon sx={{ fontSize: 50 }} />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </Box>
        <Box className="field-container">
          <LockOutlinedIcon sx={{ fontSize: 50 }} />
          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </Box>
        <Button
          variant="contained"
          disabled={isDisabled}
          onClick={() => handleLogin()}
        >
          Login
        </Button>
        <NavLink component="button" underline="hover" variant="subtitle1">
          Forgot Password
        </NavLink>
      </Box>
    </Box>
  );
};

export default LoginForm;
