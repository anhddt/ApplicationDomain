import "./loginPage.css";
import { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { getAuth, sendPasswordResetEmail, connectAuthEmulator } from "firebase/auth";
import firebase from '../config'

const passwordResetForm = () => {
    const [email, setEmail] = useState([]);
    const forgotPW =(email)=>{
      firebase.auth().sendPasswordResetEmail(email)
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
          <Button variant="contained" disabled={isDisabled} onClick={()=>forgotPW()}>
            Recover Password
          </Button>
        </Box>
      </Box>
    );
}
export default passwordResetForm;
   
// const auth = getAuth();
// sendPasswordResetEmail(auth, email)
//   .then(() => {
//       // The link was successfully sent. Inform the user.
//       // Save the email locally so you don't need to ask the user for it again
//       // if they open the link on the same device.
//       window.localStorage.setItem('emailForSignIn', email);
//       // ...
//   })
//   .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // ...
//   });