import { createContext, useState, useContext } from "react";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";

const Context = createContext();
export const useThemeProvider = () => {
  return useContext(Context);
};

/**
 * On your page, import useThemeProvider
 * Then pick the the variable that you want to import
 * say const { theme } = useThemeProvider();
 * or const { tableStyle } = useThemeProvider();
 * or { theme, tableStyle } = useThemeProvider();
 * @param {*} param0
 * @returns
 */
const CustomThemeProvider = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [theme, setTheme] = useState(
    sessionStorage.getItem("theme") || (prefersDarkMode ? "dark" : "light")
  );
  const getHeaderColor = () =>
    theme === "dark" ? "rgba(30, 27, 27, 0.745)" : "rgb(223, 223, 223)";
  const getBodyHoverColor = () =>
    theme === "dark" ? "rgb(20, 19, 19)" : "white";
  const getBodyColor = () =>
    theme === "dark" ? "rgba(41, 37, 37, 0.745)" : "rgb(246, 243, 243)";
  /**
   * This style is used for the chart of accounts table
   * This can be imported to use for the other table as well
   */
  const tableStyles = {
    border: "none",
    "& .MuiDataGrid-cell:hover": {
      backgroundColor: getBodyHoverColor(),
    },
    "& .MuiDataGrid-columnHeaderCheckbox": {
      backgroundColor: getHeaderColor(),
    },
    "& .MuiDataGrid-columnHeader--sortable": {
      backgroundColor: getHeaderColor(),
    },
    "& .MuiDataGrid-footerContainer": {
      backgroundColor: getHeaderColor(),
    },
    "& .MuiDataGrid-virtualScrollerRenderZone": {
      backgroundColor: getBodyColor(),
    },
    "& MuiDataGrid-columnHeaders": {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
  };
  const customTheme = createTheme({
    palette: {
      mode: theme,
    },
  });
  const values = {
    theme,
    setTheme,
    tableStyles,
  };
  return (
    <Context.Provider value={values}>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Context.Provider>
  );
};

export default CustomThemeProvider;
