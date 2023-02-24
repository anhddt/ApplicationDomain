import "./registerPage.css";
import { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { showIf } from "../utils/conditionalRendering";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../utils/AuthProvider";
import {
  checkPwLength,
  checkPwFirstChar,
  checkPwForNumbers,
  checkPwForSpecialChar,
} from "../../middleware/verification/userInfo";

const RegisterForm = () => {
  const date = new Date();
  const { createAccount } = useAuth();
  const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
  const month =
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth()}`;
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    street: "",
    city: "",
    role: "user",
    state: "",
    zip: "",
    country: "",
    phone: "",
    dateCreated: `${month}/${day}/${date.getFullYear()}`,
    isDisabled: true,
  });
  const [confirmPw, setConfirmPw] = useState("");
  const [confirmPwError, setConfirmPwError] = useState(false);
  const [error, setError] = useState(false);
  const [focus, setFocus] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigateTo = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
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
    setInputs((existing) => ({
      ...existing,
      [e.target.name]: e.target.value,
    }));
  };
  /**
   * Every time the password and confirm password trigger
   * This function fire and set the error oppose to the result of the
   * comparison.
   */
  useMemo(() => {
    setConfirmPwError(!(inputs.password === confirmPw));
    if (inputs.firstName && inputs.lastName) {
      const setUsername = () => {
        setInputs((existing) => ({
          ...existing,
          username: inputs.firstName.charAt(0) + inputs.lastName + day + month,
        }));
      };
      setUsername();
    }
  }, [
    inputs.password,
    inputs.firstName,
    inputs.lastName,
    confirmPw,
    day,
    month,
  ]);
  const handleFocus = () => {
    setFocus(true);
  };
  const handleSubmit = () => {
    createAccount(inputs, navigateTo, setError);
    setIsEmailSent(!error);
  };

  /**
   * the useMemo keeeps track for anychange with the
   * email, password, fName, and lName
   * inside of the [email, password, firstName, lastName]
   * everytime it detects a change the stuffs inside trigger
   * the entire return statement resolves to either true or false
   */
  const isDisabled = useMemo(() => {
    return (
      inputs.email === "" ||
      inputs.firstName === "" ||
      inputs.lastName === "" ||
      !(
        checkPwFirstChar(inputs.password) &&
        checkPwForNumbers(inputs.password) &&
        checkPwLength(inputs.password) &&
        checkPwForSpecialChar(inputs.password)
      )
    );
  }, [inputs]);

  return (
    <Box className="container">
      {showIf(
        isEmailSent,
        <Box className="email-verify-box">
          <Typography textAlign="center" variant="subtitle1">
            {" "}
            A verification email has been sent to <br />
            {inputs.email}
            <br />
            Please verify your email to login.
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              navigateTo("/login");
            }}
          >
            OK
          </Button>
        </Box>
      )}
      {showIf(
        !isEmailSent,
        <form className="userInfo-form">
          <Typography id="create-your-account-title" variant="h4">
            Create your account
          </Typography>
          <Grid spacing={2} container>
            <Grid item xs={12}>
              <Typography textAlign="left" variant="h6">
                Contact info:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="firstName"
                label="First Name"
                value={inputs.firstName}
                fullWidth
                required
                size="small"
                variant="outlined"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="lastName"
                label="Last Name"
                value={inputs.lastName}
                fullWidth
                required
                size="small"
                variant="outlined"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="phone"
                label="Phone number"
                value={inputs.phone}
                fullWidth
                size="small"
                variant="outlined"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="street"
                label="Street"
                value={inputs.street}
                fullWidth
                size="small"
                variant="outlined"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="city"
                label="City"
                value={inputs.city}
                fullWidth
                size="small"
                variant="outlined"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="state"
                label="State"
                value={inputs.state}
                fullWidth
                size="small"
                variant="outlined"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="zip"
                label="Zip"
                value={inputs.zip}
                fullWidth
                size="small"
                variant="outlined"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="country"
                label="Country"
                value={inputs.country}
                fullWidth
                size="small"
                variant="outlined"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography textAlign="left" variant="h6">
                Login info:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="username"
                label="Assigned Username"
                value={inputs.username}
                required
                fullWidth
                size="small"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="email"
                label="Email"
                value={inputs.email}
                required
                fullWidth
                size="small"
                variant="outlined"
                onChange={(e) => {
                  handleChange(e);
                }}
                error={error}
                helperText={error && "Email invalid or already in use"}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="password"
                label="Password"
                value={inputs.password}
                required
                fullWidth
                size="small"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                InputProps={{
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
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Confirm Password"
                required
                fullWidth
                onFocus={() => {
                  handleFocus();
                }}
                size="small"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                error={confirmPwError && focus}
                helperText={
                  focus && confirmPwError && "Password does not match"
                }
                InputProps={{
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
                onChange={(e) => {
                  setConfirmPw(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box id="password-constrains">
                <Typography
                  color={checkPwLength(inputs.password) ? "green" : "black"}
                  display="block"
                  textAlign="left"
                  variant="contained"
                >
                  Must be at least 8 characters.
                </Typography>
                <Typography
                  color={checkPwFirstChar(inputs.password) ? "green" : "black"}
                  display="block"
                  textAlign="left"
                  variant="contained"
                >
                  Must start with a letter.
                </Typography>
                <Typography
                  color={checkPwForNumbers(inputs.password) ? "green" : "black"}
                  display="block"
                  textAlign="left"
                  variant="contained"
                >
                  Must have a number.
                </Typography>
                <Typography
                  color={
                    checkPwForSpecialChar(inputs.password) ? "green" : "black"
                  }
                  display="block"
                  textAlign="left"
                  variant="contained"
                >
                  Must have a special character (!, @, #, $, %, *, etc.).{" "}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                disabled={isDisabled || confirmPwError}
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
          <Box>
            Already have an account?{" "}
            <NavLink to="/login" className="nav-link">
              Login instead
            </NavLink>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default RegisterForm;
