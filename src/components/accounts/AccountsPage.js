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
import JournalReport from "./journal/JournalReport";
import Statement from "./statements/Satement";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CalculateIcon from "@mui/icons-material/Calculate";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DownloadIcon from "@mui/icons-material/Download";

const AcccountsPage = () => {
  const { theme } = useThemeProvider();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [show, setShow] = useState("Chart of accounts");
  const openWidth = 205;
  /**
   * To add a nav on the side just pass the
   * primary and the icon here.
   * then scroll down to the bottom
   * and add your to be shown component inside the
   * <Box> component after </CustomDrawer>
   */
  const listItems = [
    { primary: "Chart of accounts", icon: <FormatListNumberedIcon /> },
    { primary: "Journal", icon: <BorderColorIcon /> },
    { primary: "Calculator", icon: <CalculateIcon /> },
    { primary: "Add file", icon: <AttachFileIcon /> },
    { primary: "Get Statements", icon: <DownloadIcon /> },
  ];
  /**
   * This allows the showing of the children components after clicking on the icons
   * on the left column of the accounting page.
   * @param {} view
   */
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
    <Box sx={{ width: "100%", height: "100%", overflow: "scroll" }}>
      <HomeBar />
      <CustomDrawer
        variant="permanent"
        open={{ drawerOpen: drawerOpen, openWidth: openWidth }}
      >
        <Toolbar />
        <List
          sx={{ height: "100%", display: "block" }}
          id={
            theme === "dark"
              ? "account-page-left-drawer-dark"
              : "account-page-left-drawer-light"
          }
        >
          {ListItem}
          <Divider
            sx={{ backgroundColor: theme === "dark" ? "#B7B7B7" : "#DDDDDD" }}
          />
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
        sx={{
          pl: drawerOpen ? `${openWidth}px` : "65px",
          transition: "all .3s linear",
        }}
        id={theme === "dark" ? "paper-dark" : "paper-light"}
      >
        {showIf(show === "Chart of accounts", <ChartOfAccounts />)}
        {showIf(show === "Journal", <JournalReport />)}
        {showIf(show === "Get Statements", <Statement />)}
      </Box>
    </Box>
  );
};

export default AcccountsPage;
