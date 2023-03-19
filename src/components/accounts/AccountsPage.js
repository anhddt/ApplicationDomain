import "../utils/themeProvider/themeProvider.css";
import "./accountsPage.css";
import { useState } from "react";
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Toolbar,
} from "@mui/material";
import { showIf } from "../utils/conditionalRendering";
import { useThemeProvider } from "../utils/themeProvider/CustomThemeProvier";
import HomeBar from "../common/header/Homebar";
import CustomDrawer from "../common/drawer/Drawer";
import ChartOfAccounts from "./chartOfAccounts/ChartOfAccounts";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import CalculateIcon from "@mui/icons-material/Calculate";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DownloadIcon from "@mui/icons-material/Download";

const AcccountsPage = () => {
  const { theme } = useThemeProvider();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [show, setShow] = useState("Chart of accounts");
  /**
   * To add a nav on the side just pass the
   * primary and the icon here.
   * then scroll down to line 114-115
   * and add your to be shown component after clicking on your icon
   */
  const listItems = [
    { primary: "Chart of accounts", icon: <FormatListNumberedIcon /> },
    { primary: "Event log", icon: <NoteAltIcon /> },
    { primary: "Calculator", icon: <CalculateIcon /> },
    { primary: "Add file", icon: <AttachFileIcon /> },
    { primary: "Download", icon: <DownloadIcon /> },
  ];

  const handleShow = (view) => {
    setShow(view);
  };
  const ListItem = listItems.map((item) => {
    return (
      <Tooltip
        key={item.primary}
        title={drawerOpen ? "" : item.primary}
        placement="right"
      >
        <ListItemButton
          id={show === item.primary ? "lid-up-icon" : "menu-item"}
          sx={{
            minHeight: 48,
            justifyContent: drawerOpen ? "initial" : "center",
            px: 2.5,
          }}
          onClick={() => handleShow(item.primary)}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: drawerOpen ? 3 : "auto",
              justifyContent: "center",
              color: "inherit",
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.primary}
            sx={{ opacity: drawerOpen ? 1 : 0 }}
          />
        </ListItemButton>
      </Tooltip>
    );
  });
  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <Box>
      <HomeBar />
      <CustomDrawer variant="permanent" open={drawerOpen}>
        <Toolbar />
        <List
          sx={{ minHeight: "92vh", display: "block" }}
          id={theme === "dark" ? "box-dark" : "box-light"}
        >
          {ListItem}
          <Divider />
          <List>
            <ListItemButton id="menu-item" onClick={() => handleDrawer()}>
              <ListItemIcon
                sx={{ color: "inherit", ml: drawerOpen ? 18 : "auto" }}
              >
                {drawerOpen ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
              </ListItemIcon>
            </ListItemButton>
          </List>
        </List>
      </CustomDrawer>
      <Box
        className="account-page-paper"
        sx={{ pl: drawerOpen ? "205px" : "65px" }}
        id={theme === "dark" ? "paper-dark" : "paper-light"}
      >
        {showIf(show === "Chart of accounts", <ChartOfAccounts />)}
      </Box>
    </Box>
  );
};

export default AcccountsPage;
