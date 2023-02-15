import "./loginPage.css";
import { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { signInEmailPassword,sendPasswordReset } from "../../utilities/utils";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();
  const isDisabled = useMemo(() => {
    return email === "" || password === "";
  }, [email, password]);
  
  const handleLogin = () => {
    signInEmailPassword(email, password, navigateTo);
  };

  const forgotPW =()=>{
    sendPasswordReset(email)
    console.log('email sent')
  }

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
            label="Password"
            variant="outlined"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </Box>
        <Button variant="contained" disabled={isDisabled} onClick={()=>handleLogin()}>
          Login
        </Button>
        <Grid container>
          <Grid item xs={6}>
            <NavLink component="button" underline="hover" variant="subtitle1" onClick={()=>forgotPW()}>
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
    </Box>
  );
};

export default LoginForm;
