import "./header.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import LoginDropDownIcon from "../profile/LoginDropDownIcon";
import CustomProfileIcon from "../profile/CustomProfileIcon";
import MenuIcon from "@mui/icons-material/Menu";
import LogoIcon from "../logo/LogoIcon";
import ReactCalendarIcon from "../calendar/ReactCalendarIcon";
import CustomNotificationIcon from "../notification/CustomNotificationIcon";
import { showIf } from "../../utils/conditionalRendering";

const Homebar = () => {
  const navigateTo = useNavigate();
  const { currentUser, firstName, role } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenNavMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="sticky" color="inherit" sx={{ zIndex: 1201 }}>
      <Toolbar>
        <Tooltip title={!anchorEl ? "Menu" : ""} placement="bottom">
          <IconButton
            id={
              anchorEl
                ? "calendar-menu-icon-homebar"
                : "calendar-menu-expand-homebar"
            }
            size="medium"
            color="inherit"
            onClick={(e) => handleOpenNavMenu(e)}
            sx={{ mr: 2 }}
          >
            <MenuIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
        <Menu
          open={anchorEl ? true : false}
          onClose={() => {
            handleCloseNavMenu();
          }}
          anchorEl={anchorEl}
        >
          <MenuItem
            id="menu-item"
            onClick={() => {
              handleCloseNavMenu();
              navigateTo("/");
            }}
          >
            <Typography variant="subtitle1">Home</Typography>
          </MenuItem>
          <MenuItem id="menu-item">
            <Typography variant="subtitle1">About</Typography>
          </MenuItem>
          {showIf(
            currentUser && role === "admin",
            <MenuItem
              id="menu-item"
              onClick={() => {
                handleCloseNavMenu();
                navigateTo("/admin");
              }}
            >
              <Typography variant="subtitle1">Admin</Typography>
            </MenuItem>
          )}
          {currentUser && (
            <MenuItem
              onClick={() => {
                handleCloseNavMenu();
                navigateTo("/accounts");
              }}
              id="menu-item"
            >
              <Typography variant="subtitle1">Accounting</Typography>
            </MenuItem>
          )}
          <MenuItem id="menu-item">
            <Typography variant="subtitle1">Contact</Typography>
          </MenuItem>
        </Menu>
        <ReactCalendarIcon
          id1="calendar-menu-icon-homebar"
          id2="calendar-menu-expand-homebar"
          size="medium"
          fontSize="medium"
          view="month"
        />
        <Box sx={{ ml: 2 }} flexGrow={1}>
          <LogoIcon />
        </Box>
        <Stack direction="row" spacing={2}>
          <Box display="flex" alignItems="center">
            <Typography flexGrow={1} variant="subtitle1">
              {currentUser ? `HELLO ${firstName.toUpperCase()}!` : "WELCOME!"}
            </Typography>
          </Box>
          {currentUser && role !== "user" && (
            <CustomNotificationIcon
              id1="notification-icon-homebar"
              id2="notification-icon-expand-homebar"
            />
          )}
          {showIf(
            !currentUser,
            <LoginDropDownIcon
              id1="profile-icon-not-menu-homebar"
              id2="profile-expand-chevron-not-menu-homebar"
            />
          )}
          {showIf(
            currentUser,
            <CustomProfileIcon
              id1="profile-icon-not-menu-homebar"
              id2="profile-expand-chevron-not-menu-homebar"
            />
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Homebar;
