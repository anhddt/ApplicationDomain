import "./customProfileIcon.css";
import { useThemeProvider } from "../../utils/themeProvider/CustomThemeProvier";
import { useState } from "react";
import { useAuth } from "../../utils/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { showIf } from "../../utils/conditionalRendering";

/**
 * An interactive icon used in the Header
 *
 * To add another menu,
 * add nother MenuItem
 * and handle it's onOnclick
 */
const CustomProfileIcon = ({ id1, id2 }) => {
  const { theme, setTheme } = useThemeProvider();
  const navigateTo = useNavigate();
  const { logOut } = useAuth();
  const [anchorEl, setAnchorEl] = useState();
  const handleProfileClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl();
  };
  const handleMenuClick = () => {
    handleClose();
    if (theme === "dark") {
      setTheme("light");
      sessionStorage.setItem("theme", "light");
    } else {
      setTheme("dark");
      sessionStorage.setItem("theme", "dark");
    }
  };
  return (
    <Box>
      <IconButton
        color="inherit"
        id={anchorEl ? id1 : id2}
        onClick={(e) => handleProfileClick(e)}
      >
        <AccountCircleIcon />
        {showIf(!anchorEl, <ExpandMoreIcon id={id2} />)}
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
          window.location.pathname !== "/userProfile",
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
        )}
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
        <MenuItem
          id="profile-expand-chevron"
          onClick={() => {
            handleMenuClick();
          }}
        >
          {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          <Typography variant="subtitle1">Theme</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default CustomProfileIcon;
