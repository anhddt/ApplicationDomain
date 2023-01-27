import "./loginForm.css";
import {
  Box,
  Button,
  FormControl,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useMemo, useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isDisabled = useMemo(() => {
    return username === "" || password === "";
  }, [username, password]);

  return (
    <FormControl class="login-form">
      <Typography id="login-form-message" variant="h4">
        Welcome
      </Typography>
      <Box>
        Not a member? <Link>Create Account</Link>
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
      <Button color="primary" variant="contained" disabled={isDisabled}>
        Login
      </Button>
      <Grid container>
        <Grid item xs={6}>
          <Link>Forgot Password</Link>
        </Grid>
        <Grid item xs={6}>
          <Link>Forgot Username</Link>
        </Grid>
      </Grid>
    </FormControl>
  );
};

export default LoginPage;