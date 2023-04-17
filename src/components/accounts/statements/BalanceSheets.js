import "./statement.css";
import { Box, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
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
  return `From ${month1}/${date1}/${day.year()} to ${month2}/${date2}/${day2.year()} in US Dollar`;
};

const BalanceSheets = ({ fromDate, toDate, docRef }) => {
  const [currentAssets, setCurrentAssets] = useState([]);
  const [totalCA, setTotalCA] = useState(0);
  const [nonCurrentAssets, setNonCurrentAssets] = useState([]);
  const [totalA, setTotalA] = useState(0);
  const [currentLiabilities, setCurrentLiabilities] = useState([]);
  const [totalCL, setTotalCL] = useState(0);
  const [nonCurrentLiabilities, setNonCurrentLiabilities] = useState([]);
  const [stockholdersEquity, setStockholdersEquity] = useState([]);
  const [totalLE, setTotalLE] = useState([]);
  const [netIncome, setNetIncome] = useState(0);

  useMemo(() => {
    const getIncomeStatementInfo = async () => {
      const currAssets = await getAccountsBySubCat("Current Assets");
      currAssets.map(
        async (account, index) =>
          (currAssets[index].balance = await getAccountBalanceWithDateRange(
            account.id,
            account.normalSide,
            fromDate.$d,
            toDate.$d
          ))
      );
      let tCA = 0;
      currAssets.forEach((acc) => (tCA += acc.balance));
      setCurrentAssets(currAssets);
      setTotalCA(tCA);
      const nonCurrAssets = await getAccountsBySubCat("Non-current Assets");
      nonCurrAssets.map(
        async (account, index) =>
          (nonCurrAssets[index].balance = await getAccountBalanceWithDateRange(
            account.id,
            account.normalSide,
            fromDate.$d,
            toDate.$d
          ))
      );
      let tNCA = 0;
      nonCurrAssets.forEach((acc) => (tNCA += acc.balance));
      setNonCurrentAssets(nonCurrAssets);
      setTotalA(tCA + tNCA);
      const currLiabilities = await getAccountsBySubCat("Current Liabilities");
      currLiabilities.map(
        async (account, index) =>
          (currLiabilities[index].balance =
            await getAccountBalanceWithDateRange(
              account.id,
              account.normalSide,
              fromDate.$d,
              toDate.$d
            ))
      );
      setCurrentLiabilities(currLiabilities);
      let tCL = 0;
      currLiabilities.forEach((acc) => (tCL += acc.balance));
      setTotalCL(tCL);
      const nonCurrLiabilities = await getAccountsBySubCat(
        "Non-current Liabilities"
      );
      nonCurrLiabilities.map(
        async (account, index) =>
          (nonCurrLiabilities[index].balance =
            await getAccountBalanceWithDateRange(
              account.id,
              account.normalSide,
              fromDate.$d,
              toDate.$d
            ))
      );
      setNonCurrentLiabilities(nonCurrLiabilities);
      let tNCL = 0;
      nonCurrLiabilities.forEach((acc) => (tNCL += acc.balance));
      const stockhlders = await getAccountsBySubCat("Stockholders' equity");
      stockhlders.map(
        async (account, index) =>
          (stockhlders[index].balance = await getAccountBalanceWithDateRange(
            account.id,
            account.normalSide,
            fromDate.$d,
            toDate.$d
          ))
      );
      setStockholdersEquity(stockhlders);
      let tSE = 0;
      stockhlders.forEach((acc) => (tSE += acc.balance));
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
      let t1 = 0;
      let t2 = 0;
      rv.forEach((acc) => (t1 += acc.balance));
      ex.forEach((acc) => (t2 += acc.balance));
      setNetIncome(t1 - t2);
      setTotalLE(tCL + tNCL + tSE + t1 - t2);
    };
    getIncomeStatementInfo();
  }, [fromDate, toDate]);
  const CurrentAssets = currentAssets.map((account) => (
    <Box key={account.id} sx={{ display: "flex" }}>
      <Typography variant="subtitle1" sx={{ textAlign: "start", flexGrow: 1 }}>
        {account.name}
      </Typography>
      <Typography variant="subtitle1" sx={{ textAlign: "right" }}>
        {account.balance.toLocaleString()}
      </Typography>
    </Box>
  ));
  const NonCurrentAssets = nonCurrentAssets.map((account) => (
    <Box key={account.id} sx={{ display: "flex" }}>
      <Typography variant="subtitle1" sx={{ textAlign: "start", flexGrow: 1 }}>
        {account.name}
      </Typography>
      <Typography variant="subtitle1" sx={{ textAlign: "right" }}>
        {account.balance.toLocaleString()}
      </Typography>
    </Box>
  ));
  const CurrentLiabilities = currentLiabilities.map((account) => (
    <Box key={account.id} sx={{ display: "flex" }}>
      <Typography variant="subtitle1" sx={{ textAlign: "start", flexGrow: 1 }}>
        {account.name}
      </Typography>
      <Typography variant="subtitle1" sx={{ textAlign: "right" }}>
        {account.balance.toLocaleString()}
      </Typography>
    </Box>
  ));
  const NonCurrentLiabilities = nonCurrentLiabilities.map((account) => (
    <Box key={account.id} sx={{ display: "flex" }}>
      <Typography variant="subtitle1" sx={{ textAlign: "start", flexGrow: 1 }}>
        {account.name}
      </Typography>
      <Typography variant="subtitle1" sx={{ textAlign: "right" }}>
        {account.balance.toLocaleString()}
      </Typography>
    </Box>
  ));
  const StockholdersEquity = stockholdersEquity.map((account) => (
    <Box key={account.id} sx={{ display: "flex" }}>
      <Typography variant="subtitle1" sx={{ textAlign: "start", flexGrow: 1 }}>
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
            {"Some Company"} <br /> {"Balance Sheets"}
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
                textAlign: "center",
                flexGrow: 1,
              }}
            >
              Assets
            </Typography>
          </Box>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", textAlign: "start", flexGrow: 1 }}
          >
            Current sssets:
          </Typography>
          <Box sx={{ ml: "50px" }}>
            {CurrentAssets}
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", textAlign: "start", flexGrow: 1 }}
              >
                Total current assets:
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
                {totalCA.toLocaleString()}
              </Typography>
            </Box>
          </Box>
          {NonCurrentAssets}
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", textAlign: "start", flexGrow: 1 }}
            >
              Total assets:
            </Typography>
            <Typography
              className="total-underline"
              variant="subtitle1"
              sx={{
                borderTop: 2,
                borderBottomStyle: "double",
                textTransform: "uppercase",
                fontWeight: "bold",
                textAlign: "right",
              }}
            >
              {totalA.toLocaleString()}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ pl: "50px", pr: "50px" }}>
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="subtitle1"
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                textAlign: "center",
                flexGrow: 1,
              }}
            >
              Liabilities and stockholders' equity
            </Typography>
          </Box>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", textAlign: "start", flexGrow: 1 }}
          >
            Current liabilities:
          </Typography>
          <Box sx={{ ml: "50px" }}>
            {CurrentLiabilities}
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", textAlign: "start", flexGrow: 1 }}
              >
                Total current liabilities:
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
                {totalCL.toLocaleString()}
              </Typography>
            </Box>
          </Box>
          {NonCurrentLiabilities}
        </Grid>
        <Grid item xs={12} sx={{ pl: "50px", pr: "50px" }}>
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", textAlign: "start", flexGrow: 1 }}
            >
              Stockholders' equity:
            </Typography>
          </Box>
          <Box sx={{ ml: "50px" }}>{StockholdersEquity}</Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="subtitle1"
              sx={{ textAlign: "start", flexGrow: 1 }}
            >
              Gain
            </Typography>
            <Typography variant="subtitle1" sx={{ textAlign: "right" }}>
              {netIncome.toLocaleString()}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ pl: "50px", display: "flex", pr: "50px" }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", textAlign: "start", flexGrow: 1 }}
          >
            Total liabilities and stockholders' equity:
          </Typography>
          <Typography
            className="total-underline"
            variant="subtitle1"
            sx={{
              borderTop: 2,
              fontWeight: "bold",
              textAlign: "right",
            }}
          >
            {totalLE.toLocaleString()}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
export default BalanceSheets;
