import "./profilePage.css";
import { useState } from "react";
import { useAuth } from "../utils/AuthProvider";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SendIcon from "@mui/icons-material/Send";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { bulkUpdateUserProperty } from "../../middleware/firebase/FireStoreUtils";
import { showIf } from "../utils/conditionalRendering";
const ContactCard = () => {
  const readOnly = true;
  const [isEdit, setIsEdit] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const {
    currentUser,
    firstName,
    lastName,
    phone,
    street,
    city,
    state,
    zip,
    country,
  } = useAuth();
  const handleChange = (e) => {
    setContactInfo((existing) => ({
      ...existing,
      [e.target.name]: e.target.value,
    }));
  };
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };
  const updateContact = async () => {
    await bulkUpdateUserProperty(currentUser.uid, contactInfo);
    handleEdit();
    window.location.reload();
  };
  return (
    <>
      {showIf(
        !isEdit,
        <form id="contact-info-block">
          <Grid container spacing={2}>
            <Grid xs={6} item>
              <Typography variant="h6" textAlign="left">
                Contact info:
              </Typography>
            </Grid>
            <Grid xs={6} item>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleEdit()}
                >
                  Edit
                </Button>
              </Box>
            </Grid>
            <Grid xs={6} item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ readOnly: readOnly }}
                fullWidth
                variant="standard"
                label="First name"
                size="small"
                value={firstName}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ readOnly: readOnly }}
                fullWidth
                variant="standard"
                label="Last Name"
                size="small"
                value={lastName}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SmartphoneIcon />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ readOnly: readOnly }}
                fullWidth
                variant="standard"
                label="Phone#"
                size="small"
                value={phone}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeIcon />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ readOnly: readOnly }}
                fullWidth
                variant="standard"
                label="Street"
                size="small"
                value={street}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationCityIcon />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ readOnly: readOnly }}
                fullWidth
                variant="standard"
                label="City"
                size="small"
                value={city}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBalanceIcon />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ readOnly: readOnly }}
                fullWidth
                variant="standard"
                label="State"
                size="small"
                value={state}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SendIcon />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ readOnly: readOnly }}
                fullWidth
                variant="standard"
                label="Zip"
                size="small"
                value={zip}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TravelExploreIcon />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ readOnly: readOnly }}
                fullWidth
                variant="standard"
                label="Country"
                size="small"
                value={country}
              />
            </Grid>
          </Grid>
        </form>
      )}
      {showIf(
        isEdit,
        <form id="contact-info-block">
          <Grid container spacing={2}>
            <Grid xs={6} item>
              <Typography variant="h6" textAlign="left">
                Update contact info:
              </Typography>
            </Grid>
            <Grid xs={6} item>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleEdit()}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
            <Grid xs={6} item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SmartphoneIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                name="phone"
                label="Phone#"
                size="small"
                placeholder={phone}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                name="street"
                label="Street"
                size="small"
                placeholder={street}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationCityIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                name="city"
                label="City"
                size="small"
                placeholder={city}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBalanceIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                name="state"
                label="State"
                size="small"
                placeholder={state}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SendIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                name="zip"
                label="Zip"
                size="small"
                placeholder={zip}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TravelExploreIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                name="country"
                label="Country"
                size="small"
                placeholder={country}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            onClick={() => {
              updateContact();
            }}
            fullWidth
          >
            Submit
          </Button>
        </form>
      )}
    </>
  );
};
export default ContactCard;
