import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";

const LoginDropDownIcon = () => {
    const navigateTo = useNavigate();
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
            <ArrowDropDownCircleIcon />
          </IconButton>
          <Menu
            open={expand}
            onClose={() => {
              handleClose();
            }}
            anchorEl={anchorEl}
          >
            <MenuItem onClick={() => { handleClose(); navigateTo("/login");}}>
              <LoginIcon/>
              <Typography variant="subtitle1">Sign in</Typography>
            </MenuItem>
            <MenuItem onClick={() => { handleClose(); navigateTo("/register");}}>
                <AppRegistrationIcon />
              <Typography variant="subtitle1">Register</Typography>
            </MenuItem>
          </Menu>
        </Box>
      );
}

export default LoginDropDownIcon;