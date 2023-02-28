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
import CustomProfileIcon from "../profile/CustomProfileIcon";
import LoginDropDownIcon from "../profile/LoginDropDownIcon";
import MenuIcon from "@mui/icons-material/Menu";
import LogoIcon from "../logo/LogoIcon";
import ReactCalendarIcon from "../calendar/ReactCalendarIcon";
import { showIf } from "../../utils/conditionalRendering";

const MiniHeader = () => {
  const navigateTo = useNavigate();
  const { currentUser, firstName, role } = useAuth();
  const [expand, setExpand] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenNavMenu = (e) => {
    setExpand(!expand);
    setAnchorEl(e.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setExpand(!expand);
    setAnchorEl(null);
  };
  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar>
        <IconButton
          size="medium"
          color="inherit"
          onClick={(e) => handleOpenNavMenu(e)}
          sx={{ mr: 2 }}
        >
          <MenuIcon fontSize="medium" />
        </IconButton>
        <Menu
          open={expand}
          onClose={() => {
            handleCloseNavMenu();
          }}
          anchorEl={anchorEl}
        >
          <MenuItem
            onClick={() => {
              handleCloseNavMenu();
              navigateTo("/");
            }}
          >
            Home
          </MenuItem>
          <MenuItem>About</MenuItem>
          {showIf(
            currentUser && role === "admin",
            <MenuItem
              onClick={() => {
                handleCloseNavMenu();
                navigateTo("/admin");
              }}
            >
              Admin
            </MenuItem>
          )}
          <MenuItem>Accounting</MenuItem>
          <MenuItem>Contact</MenuItem>
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

export default MiniHeader;
