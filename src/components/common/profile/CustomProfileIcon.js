import "./customProfileIcon.css";
import { useState } from "react";
import { useAuth } from "../../utils/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
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
  const [expand, setExpand] = useState(false);
  const [anchorEl, setAnchorEl] = useState();
  const handleProfileClick = (e) => {
    setExpand(!expand);
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl();
    setExpand(!expand);
  };
  return (
    <Box>
      <IconButton
        id="profile-expand-chevron"
        onClick={(e) => handleProfileClick(e)}
      >
        <AccountCircleIcon id="profile-icon" />
        {showIf(!expand, <ExpandMoreIcon id="profile-expand-chevron" />)}
        {showIf(expand, <ExpandLessIcon id="profile-icon" />)}
      </IconButton>
      <Menu
        open={expand}
        onClose={() => {
          handleClose();
        }}
        anchorEl={anchorEl}
      >
        <MenuItem onClick={() =>{ handleClose(); navigateTo("/userProfile")}}>
          <AccountBoxIcon/>
          <Typography variant="subtitle1">Profile</Typography>
        </MenuItem>
        <MenuItem onClick={() => {handleClose(); logOut()}}>
          <LogoutIcon/>
          <Typography variant="subtitle1">Sign out</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default CustomProfileIcon;
