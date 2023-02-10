import "./registerPage.css";
import { useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { createAccount } from "../../utilities/utils";
import { useNavigate } from "react-router-dom";

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
  const navigateTo = useNavigate();
  const handleSubmit = async () => {
    const userInfo = {firstName: firstName, lastName: lastName, email: email, password: password, street: street, city: city, state: state, zip, country: country, phone: phone};
    createAccount(userInfo, navigateTo);
  };
  
  return (
    <Box className="container">
      <Box className="register-form">
        <Grid container>
          <Grid item xs={6}>
            <TextField required label="First Name" variant="outlined" onChange={(e) => {setFirstName(e.target.value)}} />
          </Grid>
          <Grid item xs={6}>
            <TextField required label="Last Name" variant="outlined" onChange={(e) => {setLastName(e.target.value)}} />
          </Grid>
          <Grid item xs={6}>
            <TextField required label="Email" variant="outlined" onChange={(e) => {setEmail(e.target.value)}} />
          </Grid>
          <Grid item xs={6}>
            <TextField required label="Password" variant="outlined" onChange={(e) => {setPassword(e.target.value)}} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Phone number" variant="outlined" onChange={(e) => {setPhone(e.target.value)}} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Street" variant="outlined" onChange={(e) => {setStreet(e.target.value)}} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="City" variant="outlined" onChange={(e) => {setCity(e.target.value)}} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="State" variant="outlined" onChange={(e) => {setState(e.target.value)}} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Zip" variant="outlined" onChange={(e) => {setZip(e.target.value)}} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Country" variant="outlined" onChange={(e) => {setCountry(e.target.value)}} />
          </Grid>
        </Grid>
        <Button variant="contained" disabled={false} onClick={() => {handleSubmit()}}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterPage;
