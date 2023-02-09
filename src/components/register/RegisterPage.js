import "./registerPage.css";
import { useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { createAccount } from "./register";
const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box className="container">
      <Box className="register-form">
        <Grid container>
          <Grid item xs={6}>
            <TextField label="Email" variant="outlined" onChange={(e) => {setEmail(e.target.value)}} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Password" variant="outlined" onChange={(e) => {setPassword(e.target.value)}} />
          </Grid>
        </Grid>
        <Button variant="contained" disabled={false} onClick={() => {createAccount(email, password)}}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterPage;
