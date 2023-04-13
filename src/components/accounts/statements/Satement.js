import { useState } from "react";
import { Autocomplete, Box, Button, TextField, } from "@mui/material";
import { showIf } from "../../utils/conditionalRendering";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useThemeProvider } from "../../utils/themeProvider/CustomThemeProvier";
import IncomeStatement from "./IncomeStatement";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const Statement = () => {
  const { theme } = useThemeProvider();
  const [statement, setStatement] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [releaseStatement, setReleaseStatement] = useState(false);
  const isDisabled = (date1, date2) => {
    return date1 === null || date2 === null || statement === null;
  }
  const statements = [
    "BS (balance sheet)",
    "CF (cash flow statement)",
    "CI (change in equity statement)",
    "IS (income statement)",
    "RE (retained earning statement)",
  ];
  const Statement = ({statement}) => {
    switch (statement) {
      case "BS (balance sheet)":
        return <></>;
      case "CF (cash flow statement)":
        return <></>;
      case "CI (change in equity statement)":
        return <></>;
      case "IS (income statement)":
        return <IncomeStatement fromDate={fromDate} toDate={toDate}/>;
      case "RE (retained earning statement)":
        return <></>;
      default:
        return <></>;
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
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
          <Box sx={{width: "320px"}}>
            <DatePicker
              showDaysOutsideCurrentMonth
              label="Begin date *"
              sx={{
                "& .MuiSvgIcon-root: hover": {
                  color: "rgba(255, 145, 0, 0.855)",
                },
                width:"100%",
              }}
              disableFuture
              value={fromDate}
              onChange={(value) => setFromDate(value)}
              shouldDisableDate={(date) => dayjs(date).isAfter(dayjs(toDate))}
            />
          </Box>
          <Box sx={{width: "320px"}}>
            <DatePicker
              showDaysOutsideCurrentMonth
              label="End date *"
              sx={{
                "& .MuiSvgIcon-root: hover": {
                  color: "rgba(255, 145, 0, 0.855)",
                },
                width:"100%",
              }}
              disableFuture
              value={toDate}
              onChange={(value) => setToDate(value)}
              shouldDisableDate={(date) => dayjs(date).isBefore(dayjs(fromDate))}
            />
          </Box>
          <Box>
            <Autocomplete
              options={statements}
              sx={{
                width: "320px",
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
              onChange={(e, v) => setStatement(v)}
            />
          </Box>
          <Box sx={{ width: "320px", pt: "20px" }}>
            <Button fullWidth disabled={isDisabled(fromDate, toDate)} onClick={() => setReleaseStatement(true)} variant="contained" size="small">
              Generate statement
            </Button>
          </Box>
        </Box>
      </LocalizationProvider>
      {showIf(releaseStatement,
        <Statement statement={statement} />
      )}
    </Box>
  );
};

export default Statement;
