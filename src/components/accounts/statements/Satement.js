import { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useThemeProvider } from "../../utils/themeProvider/CustomThemeProvier";
const Statement = () => {
  const { theme } = useThemeProvider();
  const [statement, setStatement] = useState(null);
  const statements = [
    "BS (balance sheet)",
    "CF (cash flow statement)",
    "CI (change in equity statement)",
    "IS (income statement)",
    "RE (retained earning statement)",
  ];
  const handleAutocomplete = (v) => {
    if (v !== null) {
      const stmt = v.substr(0, v.indexOf(" "));
      setStatement(stmt);
    }
  };
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        backgroundColor: "primary.main",
        p: "20px",
        overflow: "scroll",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            width: "350px",
            height: "400px",
            backgroundColor: theme === "dark" ? "#121212" : "#f6f7f9",
            elevation: 1,
            boxShadow: 5,
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Box>
            <DatePicker
              showDaysOutsideCurrentMonth
              label="Begin date *"
              sx={{
                "& .MuiSvgIcon-root: hover": {
                  color: "rgba(255, 145, 0, 0.855)",
                },
              }}
            />
          </Box>
          <Box>
            <DatePicker
              showDaysOutsideCurrentMonth
              label="End date *"
              sx={{
                "& .MuiSvgIcon-root: hover": {
                  color: "rgba(255, 145, 0, 0.855)",
                },
              }}
            />
          </Box>
          <Box>
            <Autocomplete
              options={statements}
              sx={{
                width: "240px",
                "& .MuiSvgIcon-root: hover": {
                  color: "rgba(255, 145, 0, 0.855)",
                },
                "& .MuiSvgIcon-root: active": {
                  color: "rgba(255, 145, 0, 0.855)",
                },
              }}
              renderInput={(param) => (
                <TextField
                  {...param}
                  size="small"
                  required
                  placeholder="Pick your Statement"
                  label="Statement"
                />
              )}
              value={statement}
              onChange={(e, v) => handleAutocomplete(v)}
            />
          </Box>
          <Box sx={{ width: "240px", pt: "20px" }}>
            <Button fullWidth variant="contained" size="small">
              Generate statement
            </Button>
          </Box>
        </Box>
      </LocalizationProvider>
    </Box>
  );
};

export default Statement;
