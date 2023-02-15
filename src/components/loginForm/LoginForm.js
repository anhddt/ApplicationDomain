import "./loginForm.css";
import { NavLink } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useMemo, useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Check if either the username or password is empty
   * disable the login button 
   */
  const isDisabled = useMemo(() => {
    return username === "" || password === "";
  }, [username, password]);

  return (
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
      <Box className="field-container">
        <PersonOutlineOutlinedIcon sx={{ fontSize: 50 }} />
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
      </Box>
      <Box className="field-container">
        <LockOutlinedIcon sx={{ fontSize: 50 }} />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
      </Box>
      <Button variant="contained" disabled={isDisabled}>
        Login
      </Button>
      <Grid container>
        <Grid item xs={6}>
          <NavLink component="button" underline="hover" variant="subtitle1">
            Forgot Password
          </NavLink>
        </Grid>
        <Grid item xs={6}>
          <NavLink component="button" underline="hover" variant="subtitle1">
            Forgot Username
          </NavLink>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;
