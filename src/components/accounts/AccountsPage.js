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
import { useAuth } from "../utils/AuthProvider";
import { useLocation } from "react-router-dom";
import HomeBar from "../common/header/Homebar";
import CustomDrawer from "../common/drawer/Drawer";
import ChartOfAccounts from "./chartOfAccounts/ChartOfAccounts";
import JournalReport from "./journal/JournalReport";
import Statement from "./statements/Satement";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import BorderColorIcon from "@mui/icons-material/BorderColor";
// import CalculateIcon from "@mui/icons-material/Calculate";
// import AttachFileIcon from "@mui/icons-material/AttachFile";
import DownloadIcon from "@mui/icons-material/Download";
import UploadDownload from "./uploadDownload/UploadDownload";

const AcccountsPage = () => {
  const { state } = useLocation();
  const { role } = useAuth();
  const { theme } = useThemeProvider();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [show, setShow] = useState(state?.showItem || "Chart of accounts");
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
    // { primary: "Calculator", icon: <CalculateIcon /> },
    // { primary: "Add file", icon: <AttachFileIcon /> },
  ];

  /**
   * This allows the showing of the children components after clicking on the icons
   * on the left column of the accounting page.
   * @param {} view
   */
  const handleShow = (view) => {
    window.history.replaceState({}, document.title);
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
        sx={{ "& .MuiDrawer-paper": { borderWidth: 0 } }}
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
          {role !== "user" && (
            <Tooltip
              title={drawerOpen ? "" : "Get Statements"}
              placement="right"
            >
              <ListItemButton
                id={show === "Get Statements" ? "lid-up-icon" : "menu-item"}
                sx={{
                  minHeight: 48,
                  justifyContent: drawerOpen ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => handleShow("Get Statements")}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: drawerOpen ? 3 : "auto",
                    justifyContent: "center",
                    color: "inherit",
                  }}
                >
                  {<DownloadIcon />}
                </ListItemIcon>
                <ListItemText
                  primary="Get Statements"
                  sx={{ opacity: drawerOpen ? 1 : 0 }}
                />
              </ListItemButton>
            </Tooltip>
          )}
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
        {showIf(
          show === "Journal",
          <JournalReport defaultTab={state?.tab || 0} />
        )}
        {showIf(show === "Get Statements", <Statement />)}
        {showIf(show === "Add file", <UploadDownload />)}
      </Box>
    </Box>
  );
};

export default AcccountsPage;
