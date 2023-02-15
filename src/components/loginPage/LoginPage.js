import "./loginPage.css";
import { useMemo, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { showIf } from "../utils/conditionalRendering";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { signInEmailPassword } from "../../utilities/utils";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigateTo = useNavigate();
  const location = useLocation();
  const isDisabled = useMemo(() => {
    return email === "" || password === "";
  }, [email, password]);

  /**
   * This function handle the login mechanism
   * send in the email and password
   * a navigation function
   * and a previous location so that the navgation can navigate
   */
  const handleLogin = () => {
    signInEmailPassword(email, password, setError, navigateTo, location);
  };

  /**
   * This allows the user to press enter
   * after typing in the password
   * so that don't has to lift up the hand
   * and click login
   */
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
        {showIf( error,
          <Typography color="red">Wrong email or password, try again.</Typography>
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
