import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material";

/**
 * This drawer is used in the accounts page for selecting different
 * account views in the account page.
 * After import this drawer,
 * specify the open prop as an opject consists
 * {drawerOpen: boolean, openWidth: number}
 * check on MUI Drawer(the website) for other drfault props
 */
const openedMixin = (theme, openWidth) => ({
  width: openWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const CustomDrawer = styled(MuiDrawer, {
  shouldForwardProp: (props) => props !== "open",
})(({ theme, open }) => ({
  width: open.openWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open.drawerOpen && {
    ...openedMixin(theme, open.openWidth),
    "& .MuiDrawer-paper": openedMixin(theme, open.openWidth),
  }),
  ...(!open.drawerOpen && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default CustomDrawer;
