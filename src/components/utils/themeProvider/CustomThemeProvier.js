import { createContext, useState, useContext } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const Context = createContext();
export const useThemeProvider = () => {
  return useContext(Context);
};
const CustomThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const customTheme = createTheme({
    palette: {
      mode: theme,
    },
  });
  const values = {
    theme,
    setTheme,
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
