import "./loginPage.css";
import { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { showIf } from "../utils/conditionalRendering";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { signInEmailPassword, logOut } from "../../utilities/utils";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigateTo = useNavigate();
  const isDisabled = useMemo(() => {
    return email === "" || password === "";
  }, [email, password]);
  logOut();
  const handleLogin = () => {
    signInEmailPassword(email, password, navigateTo, setErrorMessage);
  };
  const handleKeyDown = (keyDown) => {
    if (keyDown.key === "Enter") {
      handleLogin();
    }
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
            className="nav-link"
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
            onKeyDown={(key) => {handleKeyDown(key)}}
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
        <NavLink className="nav-link">
          Forgot Password
        </NavLink>
      </Box>
    </Box>
  );
};

export default LoginForm;
