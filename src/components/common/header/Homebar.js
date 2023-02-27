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
import MenuIcon from "@mui/icons-material/Menu";
import LogoIcon from "../logo/LogoIcon";
import { showIf } from "../../utils/conditionalRendering";
const Homebar = () => {
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
          size="small"
          color="inherit"
          onClick={(e) => handleOpenNavMenu(e)}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          open={expand}
          onClose={() => {
            handleCloseNavMenu();
          }}
          anchorEl={anchorEl}
        >
          <MenuItem onClick={() => navigateTo("/")}>Home</MenuItem>
          <MenuItem>About</MenuItem>
          {showIf(
            role === "admin",
            <MenuItem onClick={() => navigateTo("/admin")}>Admin</MenuItem>
          )}
          <MenuItem>Accounting</MenuItem>
          <MenuItem>Contact</MenuItem>
        </Menu>
        <Box flexGrow={1}>
          <LogoIcon />
        </Box>
        <Stack direction="row" spacing={2}>
          <Box display="flex" alignItems="center">
            <Typography flexGrow={1} variant="subtitle1">
              {currentUser ? `HELLO ${firstName.toUpperCase()}!` : "WELCOME!"}
            </Typography>
          </Box>
          {showIf(currentUser, <CustomProfileIcon />)}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Homebar;
