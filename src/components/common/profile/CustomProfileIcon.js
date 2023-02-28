import "./customProfileIcon.css";
import { useState } from "react";
import { useAuth } from "../../utils/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { showIf } from "../../utils/conditionalRendering";

/**
 * An interactive icon used in the Header
 *
 * To add another menu,
 * add nother MenuItem
 * and handle it's onOnclick
 */
const CustomProfileIcon = () => {
  const navigateTo = useNavigate();
  const { logOut } = useAuth();
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
        <AccountCircleIcon />
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
        <MenuItem
          id="profile-expand-chevron"
          onClick={() => {
            handleClose();
            navigateTo("/userProfile");
          }}
        >
          <AccountBoxIcon />
          <Typography variant="subtitle1">Profile</Typography>
        </MenuItem>
        <MenuItem
          id="profile-expand-chevron"
          onClick={() => {
            handleClose();
            logOut();
          }}
        >
          <LogoutIcon />
          <Typography variant="subtitle1">Sign out</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default CustomProfileIcon;
