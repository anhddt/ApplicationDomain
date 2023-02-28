import "./customProfileIcon.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { showIf } from "../../utils/conditionalRendering";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const LoginDropDownIcon = () => {
  const navigateTo = useNavigate();
  const [anchorEl, setAnchorEl] = useState();
  const handleProfileClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl();
  };
  return (
    <Box>
      <IconButton
        color="inherit"
        id={anchorEl ? "profile-icon" : "profile-expand-chevron"}
        onClick={(e) => handleProfileClick(e)}
      >
        <ReadMoreIcon />
        {showIf(!anchorEl, <ExpandMoreIcon id="profile-expand-chevron" />)}
        {showIf(anchorEl, <ExpandLessIcon />)}
      </IconButton>
      <Menu
        open={anchorEl ? true : false}
        onClose={() => {
          handleClose();
        }}
        anchorEl={anchorEl}
      >
        {showIf(
          window.location.pathname !== "/login",
          <MenuItem
            id="profile-expand-chevron"
            onClick={() => {
              handleClose();
              navigateTo("/login");
            }}
          >
            <LoginIcon />
            <Typography variant="subtitle1">Sign in</Typography>
          </MenuItem>
        )}
        {showIf(
          window.location.pathname !== "/register",
          <MenuItem
            id="profile-expand-chevron"
            onClick={() => {
              handleClose();
              navigateTo("/register");
            }}
          >
            <AppRegistrationIcon />
            <Typography variant="subtitle1">Register</Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default LoginDropDownIcon;
