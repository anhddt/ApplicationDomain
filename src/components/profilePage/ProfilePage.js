import "./profilePage.css";
// import { useState } from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { useAuth } from "../utils/AuthProvider";
import Homebar from "../common/header/Homebar";
const ProfilePage = () => {
  // const [userInfo, setUserInfo] = useState({});
  const {
    firstName,
    lastName,
    phone,
    street,
    city,
    state,
    zip,
    country,
    role,
    username,
    email,
    passsword,
    dateCreated,
  } = useAuth();
  return (
    <Box>
      <Homebar />
      <Box className="profile-page-container">
        <form id="contact-info-block">
          <Grid container spacing={2}>
            <Grid xs={12} item>
              <Typography fullWidth variant="h6" textAlign="left">
                Contact info:
              </Typography>
            </Grid>
            <Grid xs={6} item>
              <TextField
                fullWidth
                label="First name"
                size="small"
                value={firstName}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                fullWidth
                label="Last name"
                size="small"
                value={lastName}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField fullWidth label="Phone#" size="small" value={phone} />
            </Grid>
            <Grid xs={6} item>
              <TextField fullWidth label="Street" size="small" value={street} />
            </Grid>
            <Grid xs={6} item>
              <TextField fullWidth label="City" size="small" value={city} />
            </Grid>
            <Grid xs={6} item>
              <TextField fullWidth label="State" size="small" value={state} />
            </Grid>
            <Grid xs={6} item>
              <TextField fullWidth label="Zip" size="small" value={zip} />
            </Grid>
            <Grid xs={6} item>
              <TextField
                fullWidth
                label="Country"
                size="small"
                value={country}
              />
            </Grid>
          </Grid>
        </form>
        <form id="contact-info-block">
          <Grid container spacing={2}>
            <Grid xs={12} item>
              <Typography fullWidth variant="h6" textAlign="left">
                Account info:
              </Typography>
            </Grid>
            <Grid xs={6} item>
              <TextField fullWidth label="Email" size="small" value={email} />
            </Grid>
            <Grid xs={6} item>
              <TextField
                fullWidth
                label="Username"
                size="small"
                value={username}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField fullWidth label="Role" size="small" value={role} />
            </Grid>
            <Grid xs={6} item>
              <TextField
                fullWidth
                label="Created Date"
                size="small"
                value={dateCreated}
              />
            </Grid>
          </Grid>
        </form>
        <form id="contact-info-block">
          <Grid container spacing={2}>
            <Grid xs={12} item>
              <Typography fullWidth variant="h6" textAlign="left">
                Update password:
              </Typography>
            </Grid>
            <Grid xs={6} item>
              <TextField
                fullWidth
                label="Old password"
                size="small"
                value={passsword}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField fullWidth label="New password" size="small" />
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default ProfilePage;
