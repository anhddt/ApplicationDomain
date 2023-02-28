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
  Typography,
} from "@mui/material";
import LoginDropDownIcon from "../profile/LoginDropDownIcon";
import CustomProfileIcon from "../profile/CustomProfileIcon";
import MenuIcon from "@mui/icons-material/Menu";
import LogoIcon from "../logo/LogoIcon";
import ReactCalendarIcon from "../calendar/ReactCalendarIcon";
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
    <AppBar position="sticky" color="inherit">
      <Toolbar>
        <IconButton
          id={anchorEl ? "lid-up-icon" : "menu-item"}
          size="medium"
          color="inherit"
          onClick={(e) => handleOpenNavMenu(e)}
          sx={{ mr: 2 }}
        >
          <MenuIcon fontSize="medium" />
        </IconButton>
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
          <MenuItem id="menu-item">
            <Typography variant="subtitle1">Accounting</Typography>
          </MenuItem>
          <MenuItem id="menu-item">
            <Typography variant="subtitle1">Contact</Typography>
          </MenuItem>
        </Menu>
        <ReactCalendarIcon size="medium" fontSize="medium" view="month" />
        <Box sx={{ ml: 2 }} flexGrow={1}>
          <LogoIcon />
        </Box>
        <Stack direction="row" spacing={2}>
          <Box display="flex" alignItems="center">
            <Typography flexGrow={1} variant="subtitle1">
              {currentUser ? `HELLO ${firstName.toUpperCase()}!` : "WELCOME!"}
            </Typography>
          </Box>
          {showIf(!currentUser, <LoginDropDownIcon />)}
          {showIf(currentUser, <CustomProfileIcon />)}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Homebar;
