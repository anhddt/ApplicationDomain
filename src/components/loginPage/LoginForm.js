import "./loginPage.css";
import "../utils/themeProvider/themeProvider.css";
import { useMemo, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { showIf } from "../utils/conditionalRendering";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { sendPasswordReset } from "../../middleware/firebase/utils";
import { useAuth } from "../utils/AuthProvider";
import { useThemeProvider } from "../utils/themeProvider/CustomThemeProvier";

const LoginForm = () => {
  const { theme } = useThemeProvider();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const navigateTo = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { signInEmailPassword } = useAuth();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  /**
   * Check if either the username or password is empty
   * disable the login button
   */
  const isDisabled = useMemo(() => {
    return inputs.email === "" || inputs.password === "";
  }, [inputs]);

  const passwordReset = () => {
    sendPasswordReset(inputs.email);
    console.log("email sent");
  };
  /**
   * Handle the change in the textField's value
   * Everytime the textField is changed,
   * it fires an event. The event is a packet with a bunch
   * of properties like target, name, value
   * The event is handled here. The function takes in
   * the event and modify the inputs variable that is defined above.
   * The input variable is a dictionary.
   * The prev is a previous state of the inputs.
   * The curly brackets inside setInputs is dictionary contains key:value
   * Inside the curly brackets, the change includes whatever
   * the previous state was and in coming change.
   */
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  /**
   * This function handle the login mechanism
   * send in the email and password
   * a navigation function
   * and a previous location so that the navgation can navigate
   */
  const handleLogin = () => {
    signInEmailPassword(inputs, setError, navigateTo, location);
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
    <Box
      className="screen"
      id={theme === "dark" ? "paper-dark" : "paper-light"}
    >
      <form
        className="login-form"
        id={theme === "dark" ? "box-dark" : "box-light"}
      >
        <Typography id="login-form-message" variant="h4">
          Sign in
        </Typography>
        {showIf(
          error,
          <Typography color="red">
            Wrong email or password, try again.
          </Typography>
        )}
        <TextField
          name="email"
          label="Email"
          value={inputs.email}
          error={error}
          required
          fullWidth
          variant="outlined"
          placeholder="Email (required)"
          onChange={(e) => {
            handleChange(e);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={inputs.password}
          error={error}
          required
          fullWidth
          variant="outlined"
          placeholder="Password (required)"
          onKeyDown={(key) => {
            handleKeyDown(key);
          }}
          onChange={(e) => {
            handleChange(e);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          disabled={isDisabled}
          onClick={() => handleLogin()}
        >
          Sign in
        </Button>
        <Box>
          Not a member?{" "}
          <NavLink to="/register" className="nav-link">
            Create Account
          </NavLink>
        </Box>
        <NavLink
          className="nav-link"
          onClick={() => passwordReset(inputs.email)}
        >
          Forgot Password
        </NavLink>
      </form>
    </Box>
  );
};

export default LoginForm;
