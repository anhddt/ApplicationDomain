import { Box, Typography } from "@mui/material";
import { useThemeProvider } from "../../utils/themeProvider/CustomThemeProvier";
import { useEffect, useState } from "react";
import {
  getAccountByName,
  getAllApprovedEntries,
} from "../../../middleware/firebase/FireStoreUtils";
import { toCurrency } from "../../accounts/chartOfAccounts/ChartOfAccounts";
import DonutChart from "./DonutChart";

/**
 * Present the cash balance
 * This is straight forward
 * @returns
 */
const CashBalance = () => {
  const { theme } = useThemeProvider();
  const [cashAccounts, setCashAccounts] = useState([{ balance: 0 }]);
  const [credits, setCredits] = useState(0);
  const [debits, setDebits] = useState(0);
  useEffect(() => {
    const getTotal = (type, param) => {
      const filteredEntries = param.filter((entry) => entry.type === type);
      let sum = 0;
      filteredEntries.forEach((entry) => (sum += entry.total));
      return sum;
    };
    (async () => {
      const cash = await getAccountByName("Cash");
      const arr = [];
      const arr2 = [];
      arr.push(cash[0].data());
      const etrs = await getAllApprovedEntries(cash[0].data().id);
      etrs.forEach((entry) => arr2.push(entry.data()));
      setCashAccounts(arr);
      setDebits(getTotal("Debit", arr2));
      setCredits(getTotal("Credit", arr2));
    })();
  }, []);

  return (
    <Box
      sx={{
        width: "570px",
        height: "410px",
        backgroundColor: theme === "dark" ? "rgb(20, 19, 19)" : "#EEEFEF",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography
          variant="subtitle1"
          sx={{ textTransform: "uppercase", fontWeight: "bold" }}
        >
          Cash Balance
        </Typography>
        <Typography
          variant="h5"
          sx={{ textTransform: "uppercase", fontWeight: "bold" }}
        >
          {`${toCurrency.format(cashAccounts[0].balance)}`}
        </Typography>
        <Typography variant="subtitle1" sx={{ textTransform: "uppercase" }}>
          {`In ${toCurrency.format(debits)}`}
        </Typography>
        <Typography variant="subtitle1" sx={{ textTransform: "uppercase" }}>
          {`Out ${toCurrency.format(credits)}`}
        </Typography>
      </Box>
      <Box sx={{ width: "400px", height: "300px" }}>
        <DonutChart inMoney={debits} outMoney={credits} />
      </Box>
    </Box>
  );
};

export default CashBalance;
