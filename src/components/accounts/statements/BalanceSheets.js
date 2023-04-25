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
  const month1 =
    day.month() + 1 <= 9 ? `0${day.month() + 1}` : `${day.month() + 1}`;
  const month2 =
    day2.month() + 1 <= 9 ? `0${day2.month() + 1}` : `${day2.month() + 1}`;
  return `From ${month1}/${date1}/${day.year()} to ${month2}/${date2}/${day2.year()} in US Dollar`;
};

/**
 * Generate the balance sheet
 * @param {*} param0
 * @returns
 */
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

  /**
   * The forEach could be reduced to one method to reduce the extra code.
   */
  useMemo(() => {
    const getIncomeStatementInfo = async () => {
      const currAssets = await getAccountsBySubCat("Current Assets");
      const nonCurrAssets = await getAccountsBySubCat("Non-current Assets");
      const currLiabilities = await getAccountsBySubCat("Current Liabilities");
      const nonCurrLiabilities = await getAccountsBySubCat(
        "Non-current Liabilities"
      );
      const stockhlders = await getAccountsBySubCat("Stockholders' equity");
      const rv = await getAccountsBySubCat("Revenue");
      const ex = await getAccountsBySubCat("Expenses");
      let tCA = 0;
      let tNCA = 0;
      let tCL = 0;
      let tNCL = 0;
      let tSE = 0;
      let t1 = 0;
      let t2 = 0;
      currAssets.forEach(async (account, index) => {
        const balance = await getAccountBalanceWithDateRange(
          account.id,
          account.normalSide,
          fromDate.$d,
          toDate.$d
        );
        currAssets[index].balance = balance;
        tCA += balance;
      });
      nonCurrAssets.forEach(async (account, index) => {
        const balance = await getAccountBalanceWithDateRange(
          account.id,
          account.normalSide,
          fromDate.$d,
          toDate.$d
        );
        nonCurrAssets[index].balance = balance;
        tNCA += balance;
      });
      currLiabilities.forEach(async (account, index) => {
        const balance = await getAccountBalanceWithDateRange(
          account.id,
          account.normalSide,
          fromDate.$d,
          toDate.$d
        );
        currLiabilities[index].balance = balance;
        tCL += balance;
      });
      nonCurrLiabilities.forEach(async (account, index) => {
        const balance = await getAccountBalanceWithDateRange(
          account.id,
          account.normalSide,
          fromDate.$d,
          toDate.$d
        );
        nonCurrLiabilities[index].balance = balance;
        tNCL += balance;
      });
      stockhlders.forEach(async (account, index) => {
        const balance = await getAccountBalanceWithDateRange(
          account.id,
          account.normalSide,
          fromDate.$d,
          toDate.$d
        );
        stockhlders[index].balance = balance;
        tSE += balance;
      });
      rv.forEach(async (account, index) => {
        const balance = await getAccountBalanceWithDateRange(
          account.id,
          account.normalSide,
          fromDate.$d,
          toDate.$d
        );
        rv[index].balance = balance;
        t1 += balance;
      });
      ex.forEach(async (account, index) => {
        const balance = await getAccountBalanceWithDateRange(
          account.id,
          account.normalSide,
          fromDate.$d,
          toDate.$d
        );
        ex[index].balance = balance;
        t2 += balance;
      });
      setTimeout(() => {
        setCurrentAssets(currAssets);
        setTotalCA(tCA);
        setNonCurrentAssets(nonCurrAssets);
        setTotalA(tCA + tNCA);
        setCurrentLiabilities(currLiabilities);
        setTotalCL(tCL);
        setNonCurrentLiabilities(nonCurrLiabilities);
        setStockholdersEquity(stockhlders);
        setNetIncome(t1 - t2);
        setTotalLE(tCL + tNCL + tSE + t1 - t2);
      }, 1000);
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
