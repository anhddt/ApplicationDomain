import "./customNotification.css";
import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Badge,
  Tooltip,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { countPendingJournals } from "../../../middleware/firebase/FireStoreUtils";
import { useNavigate } from "react-router-dom";

/**
 * The notification icon that notifies the user how many pending journal entries
 * that need their approval
 *
 * Clicking on the icon show a menu allows the user to nagivate to the pending journal
 * tab.
 */
const CustomNotificationIcon = ({ id1, id2 }) => {
  const navigateTo = useNavigate();
  const [content, setContent] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const handleProfileClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleNavigate = () => {
    handleClose();
    navigateTo("/accounts", { state: { showItem: "Journal", tab: 1 } });
  };
  useEffect(() => {
    (async () => {
      const count = await countPendingJournals();
      setContent(count);
    })();
  }, []);
  return (
    <Box>
      <Tooltip
        open={open}
        title={!anchorEl ? "Notification" : ""}
        placement="bottom"
      >
        <IconButton
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          color="inherit"
          id={anchorEl ? id1 : id2}
          onClick={(e) => handleProfileClick(e)}
        >
          <Badge color="primary" badgeContent={content}>
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        open={anchorEl ? true : false}
        onClose={() => {
          handleClose();
        }}
        anchorEl={anchorEl}
      >
        <MenuItem onClick={() => handleNavigate()} sx={{ p: 0, m: 0 }}>
          <Box className="notification-box">
            <Typography>
              {`You have ${content} pending journal entries.`}
            </Typography>
            <Box className="overlay">
              <Box className="text">
                <Typography>{`Go to journal`}</Typography>
              </Box>
            </Box>
          </Box>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default CustomNotificationIcon;
