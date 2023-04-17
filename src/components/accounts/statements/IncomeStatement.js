import "./statement.css";
import { Box, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useThemeProvider } from "../../utils/themeProvider/CustomThemeProvier";
import {
  getAccountsBySubCat,
  getAccountBalanceWithDateRange,
} from "../../../middleware/firebase/FireStoreUtils";
import { useMemo, useState } from "react";

export const getDate = (fromDate, toDate) => {
  const day = dayjs(fromDate);
  const day2 = dayjs(toDate);
  const date1 = day.date() <= 9 ? `0${day.date()}` : `${day.date()}`;
  const date2 = day2.date() <= 9 ? `0${day2.date()}` : `${day2.date()}`;
  const month1 = day.month() <= 9 ? `0${day.month()}` : `${day.month()}`;
  const month2 = day2.month() <= 9 ? `0${day2.month()}` : `${day2.month()}`;
  return `From ${month1}/${date1}/${day.year()} to ${month2}/${date2}/${day2.year()} in U.S. Dollar`;
};

const IncomeStatement = ({ fromDate, toDate, docRef, setLoading }) => {
  const { theme } = useThemeProvider();
  const className =
    theme === "dark" ? "total-underline-dark" : "total-underline";
  const [revenue, setRevenue] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [totalRv, setTotalRv] = useState(0);
  const [totalEx, setTotalEx] = useState(0);
  const [netIncome, setNetIncome] = useState(0);
  useMemo(() => {
    const getIncomeStatementInfo = async () => {
      const rv = await getAccountsBySubCat("Revenue");
      rv.map(
        async (account, index) =>
          (rv[index].balance = await getAccountBalanceWithDateRange(
            account.id,
            account.normalSide,
            fromDate.$d,
            toDate.$d
          ))
      );
      const ex = await getAccountsBySubCat("Expenses");
      ex.map(
        async (account, index) =>
          (ex[index].balance = await getAccountBalanceWithDateRange(
            account.id,
            account.normalSide,
            fromDate.$d,
            toDate.$d
          ))
      );
      setRevenue(rv);
      setExpenses(ex);
      let t1 = 0;
      let t2 = 0;
      rv.forEach((acc) => (t1 += acc.balance));
      setTotalRv(t1);
      ex.forEach((acc) => (t2 += acc.balance));
      setTotalEx(t2);
      setNetIncome(t1 - t2);
    };
    getIncomeStatementInfo();
  }, [fromDate, toDate]);
  const Revenue = revenue.map((account) => (
    <Box key={account.id} sx={{ display: "flex" }}>
      <Typography
        variant="subtitle1"
        sx={{ textTransform: "uppercase", textAlign: "start", flexGrow: 1 }}
      >
        {account.name}
      </Typography>
      <Typography variant="subtitle1" sx={{ textAlign: "right" }}>
        {account.balance.toLocaleString()}
      </Typography>
    </Box>
  ));
  const Expenses = expenses.map((account) => (
    <Box key={account.id} sx={{ display: "flex" }}>
      <Typography
        variant="subtitle1"
        sx={{ textTransform: "uppercase", textAlign: "start", flexGrow: 1 }}
      >
        {account.name}
      </Typography>
      <Typography variant="subtitle1" sx={{ textAlign: "right" }}>
        {account.balance.toLocaleString()}
      </Typography>
    </Box>
  ));
  return (
    <Box
      ref={docRef}
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        backgroundColor: "inherit",
        color: "black",
      }}
    >
      <Grid container rowSpacing={2} sx={{ alignContent: "start", pt: "50px" }}>
        <Grid item xs={12} sx={{ alignItems: "center" }}>
          <Typography
            variant="h5"
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {" "}
            {"Some Company"} <br /> {"Income Statement"}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            {getDate(fromDate, toDate)}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ pl: "50px", pr: "50px" }}>
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="subtitle1"
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                textAlign: "start",
                flexGrow: 1,
              }}
            >
              Revenue:
            </Typography>
          </Box>
          <Box sx={{ ml: "50px" }}>
            {Revenue}
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="subtitle1"
                sx={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  textAlign: "start",
                  flexGrow: 1,
                }}
              >
                Total:
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  borderTop: 2,
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                {totalRv.toLocaleString()}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="subtitle1"
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                textAlign: "start",
                flexGrow: 1,
              }}
            >
              Expenses:
            </Typography>
          </Box>
          <Box sx={{ ml: "50px" }}>
            {Expenses}
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="subtitle1"
                sx={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  textAlign: "start",
                  flexGrow: 1,
                }}
              >
                Total:
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  borderTop: 2,
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                {totalEx.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ pl: "50px", display: "flex", pr: "50px" }}>
          <Typography
            variant="subtitle1"
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              textAlign: "start",
              flexGrow: 1,
            }}
          >
            Net income:
          </Typography>
          <Typography
            className={className}
            variant="subtitle1"
            sx={{
              borderTop: 2,
              fontWeight: "bold",
              textAlign: "right",
            }}
          >
            {netIncome.toLocaleString()}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
export default IncomeStatement;
