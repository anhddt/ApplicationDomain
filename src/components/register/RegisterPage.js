import "./registerPage.css";
import { Box, Button, Grid, TextField } from "@mui/material";

const RegisterPage = () => {
  const fieldName = [
    "First Name",
    "Last Name",
    "D.O.B.",
    "Email",
    "Street",
    "City",
    "Zip Code",
    "State",
    "Username",
    "Password",
  ];

  const InputField = () => {
    return (
      <Box backgroundColor="white">
        <Grid container spacing={3}>
          {fieldName.map((field) => (
            <Grid item xs={6}>
              <TextField label={`${field}`} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };
  return (
    <Box className="container">
      <Box className="register-form">
        <InputField />
        <Button variant="contained" disabled={false}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterPage;
