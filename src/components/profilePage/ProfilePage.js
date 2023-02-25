import "./profilePage.css";
import { useState } from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { useAuth } from "../utils/AuthProvider";
import Homebar from "../common/header/Homebar";
const ProfilePage = () => {
    const { firstName,
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
        currentUser,
        dateCreated,
        isDisabled } = useAuth();
    return (
        <Box>
            <Homebar />
            <Box className="profile-page-container">
                <form id="contact-info-block">
                    <Grid container spacing={2}>
                        <Grid xs={12} item >
                            <Typography fullWidth variant="h6" textAlign="left">
                                Contact info:
                            </Typography>
                        </Grid>
                        <Grid xs={6} item >
                            <TextField fullWidth label="First name" size="small" />
                        </Grid>
                        <Grid xs={6} item >
                            <TextField fullWidth label="Last name" size="small" />
                        </Grid>
                        <Grid xs={6} item >
                            <TextField fullWidth label="Phone#" size="small" />
                        </Grid>
                        <Grid xs={6} item >
                            <TextField fullWidth label="Street" size="small" />
                        </Grid>
                        <Grid xs={6} item >
                            <TextField fullWidth label="Cityt" size="small" />
                        </Grid>
                        <Grid xs={6} item >
                            <TextField fullWidth label="State" size="small" />
                        </Grid>
                        <Grid xs={6} item >
                            <TextField fullWidth label="Zip" size="small" />
                        </Grid>
                        <Grid xs={6} item >
                            <TextField fullWidth label="Country" size="small" />
                        </Grid>
                    </Grid>
                </form>
                <form id="contact-info-block">
                    <Grid container spacing={2}>
                        <Grid xs={12} item >
                            <Typography fullWidth variant="h6" textAlign="left">
                                Login info:
                            </Typography>
                        </Grid>
                        <Grid xs={6} item >
                            <TextField fullWidth label="Email" size="small" />
                        </Grid>
                        <Grid xs={6} item >
                            <TextField fullWidth label="Username" size="small" />
                        </Grid>
                    </Grid>
                </form>
                <form id="contact-info-block">
                    <Grid container spacing={2}>
                        <Grid xs={12} item >
                            <Typography fullWidth variant="h6" textAlign="left">
                                Update password:
                            </Typography>
                        </Grid>
                        <Grid xs={6} item >
                            <TextField fullWidth label="Old password" size="small" />
                        </Grid>
                        <Grid xs={6} item >
                            <TextField fullWidth label="New password" size="small" />
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    );
};

export default ProfilePage;