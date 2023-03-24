import "./profilePage.css";
import "../utils/themeProvider/themeProvider.css";
import { useThemeProvider } from "../utils/themeProvider/CustomThemeProvier";
import { Fragment, useState } from "react";
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
  const { theme } = useThemeProvider();
  const readOnly = true;
  const [isEdit, setIsEdit] = useState(false);
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
    setRefresh,
  } = useAuth();
  const info = {
    phone: phone,
    street: street,
    city: city,
    state: state,
    zip: zip,
    country: country,
  };
  const [contactInfo, setContactInfo] = useState(info);
  const handleChange = (e) => {
    setContactInfo((existing) => ({
      ...existing,
      [e.target.name]: e.target.value,
    }));
  };
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleCancel = () => {
    setContactInfo(info);
    setIsEdit(!isEdit);
  };
  const updateContact = async () => {
    await bulkUpdateUserProperty(currentUser.uid, contactInfo);
    handleEdit();
    setRefresh((refresh) => !refresh);
  };
  return (
    <form
      className="contact-info-block"
      id={theme === "dark" ? "box-dark" : "box-light"}
    >
      <Grid container spacing={2}>
        <Grid xs={6} item>
          <Typography variant="h6" textAlign="left">
            {isEdit ? "Update contact info:" : "Contact info:"}
          </Typography>
        </Grid>
        <Grid xs={6} item>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                isEdit ? handleCancel() : handleEdit();
              }}
            >
              {isEdit ? "Cancel" : "Edit"}
            </Button>
          </Box>
        </Grid>
        {showIf(
          !isEdit,
          <Fragment>
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
          </Fragment>
        )}
        <Grid xs={6} item>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SmartphoneIcon />
                </InputAdornment>
              ),
            }}
            inputProps={{ readOnly: isEdit ? false : readOnly }}
            fullWidth
            variant={isEdit ? "outlined" : "standard"}
            name="phone"
            label="Phone#"
            size="small"
            value={contactInfo.phone}
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
            inputProps={{ readOnly: isEdit ? false : readOnly }}
            fullWidth
            variant={isEdit ? "outlined" : "standard"}
            name="street"
            label="Street"
            size="small"
            value={contactInfo.street}
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
            inputProps={{ readOnly: isEdit ? false : readOnly }}
            fullWidth
            variant={isEdit ? "outlined" : "standard"}
            name="city"
            label="City"
            size="small"
            value={contactInfo.city}
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
            inputProps={{ readOnly: isEdit ? false : readOnly }}
            fullWidth
            variant={isEdit ? "outlined" : "standard"}
            name="state"
            label="State"
            size="small"
            value={contactInfo.state}
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
            inputProps={{ readOnly: isEdit ? false : readOnly }}
            fullWidth
            variant={isEdit ? "outlined" : "standard"}
            name="zip"
            label="Zip"
            size="small"
            value={contactInfo.zip}
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
            inputProps={{ readOnly: isEdit ? false : readOnly }}
            fullWidth
            variant={isEdit ? "outlined" : "standard"}
            name="country"
            label="Country"
            size="small"
            value={contactInfo.country}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </Grid>
      </Grid>
      {showIf(
        isEdit,
        <Button
          variant="contained"
          onClick={() => {
            updateContact();
          }}
          fullWidth
        >
          Submit
        </Button>
      )}
    </form>
  );
};
export default ContactCard;
