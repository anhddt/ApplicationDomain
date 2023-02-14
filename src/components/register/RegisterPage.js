import "./registerPage.css";
import { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Header } from "../common";
import { Box, Button, TextField, Typography } from "@mui/material";
import { createAccount } from "../../utilities/utils";
import {
  checkPwLength,
  checkPwFirstChar,
  checkPwForNumbers,
  checkPwForSpecialChar,
} from "../../middleware/verification/userInfo";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigateTo = useNavigate();

  const handleSubmit = async () => {
    const userInfo = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      street: street,
      city: city,
      state: state,
      zip,
      country: country,
      phone: phone,
    };
    createAccount(userInfo, navigateTo, setError, setErrorMessage);
  };

  const isDisabled = useMemo(() => {
    return (
      email === "" ||
      firstName === "" ||
      lastName === "" ||
      !(
        checkPwFirstChar(password) &&
        checkPwForNumbers(password) &&
        checkPwLength(password) &&
        checkPwForSpecialChar(password)
      )
    );
  }, [email, password, firstName, lastName]);

  return (
    <Box className="container">
      <Header />
      <Box className="userInfo-form">
        <Typography id="create-your-account-title" variant="h4">
          Create your account
        </Typography>
        <Box>
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="nav-link"
          >
            Login instead
          </NavLink>
        </Box>
        <Box id="input-container">
          <Typography textAlign="left" variant="h6">
            Contact info:
          </Typography>
          <Box id="contact-container">
            <Box id="contact-info-container">
              <TextField
                fullWidth
                required
                label="First Name"
                size="small"
                variant="outlined"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <TextField
                fullWidth
                required
                label="Last Name"
                size="small"
                variant="outlined"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </Box>
            <Box id="contact-info-container">
              <TextField
                fullWidth
                label="Phone number"
                size="small"
                variant="outlined"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              <TextField
                fullWidth
                label="Street"
                size="small"
                variant="outlined"
                onChange={(e) => {
                  setStreet(e.target.value);
                }}
              />
            </Box>
            <Box id="contact-info-container">
              <TextField
                fullWidth
                label="City"
                size="small"
                variant="outlined"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
              <TextField
                fullWidth
                label="State"
                size="small"
                variant="outlined"
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
            </Box>
            <Box id="contact-info-container">
              <TextField
                fullWidth
                label="Zip"
                size="small"
                variant="outlined"
                onChange={(e) => {
                  setZip(e.target.value);
                }}
              />
              <TextField
                fullWidth
                label="Country"
                size="small"
                variant="outlined"
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              />
            </Box>
          </Box>
          <Typography textAlign="left" variant="h6">
            Login info:
          </Typography>
          <Box id="login-info-container">
            <TextField
              fullWidth
              required
              label="Email"
              size="small"
              variant="outlined"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              error={error}
              helperText={errorMessage}
            />
            <TextField
              fullWidth
              required
              label="Password"
              size="small"
              variant="outlined"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Box id="password-constrains">
              <Typography
                color={checkPwLength(password) ? "green" : "black"}
                display="block"
                textAlign="left"
                variant="contained"
              >
                Must be at least 8 characters.
              </Typography>
              <Typography
                color={checkPwFirstChar(password) ? "green" : "black"}
                display="block"
                textAlign="left"
                variant="contained"
              >
                Must start with a letter.
              </Typography>
              <Typography
                color={checkPwForNumbers(password) ? "green" : "black"}
                display="block"
                textAlign="left"
                variant="contained"
              >
                Must have a number.
              </Typography>
              <Typography
                color={checkPwForSpecialChar(password) ? "green" : "black"}
                display="block"
                textAlign="left"
                variant="contained"
              >
                Must have a special character (!, @, #, $, %, *, etc.).{" "}
              </Typography>
            </Box>
            <Button
              variant="contained"
              disabled={isDisabled}
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPage;
