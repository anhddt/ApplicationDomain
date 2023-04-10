import { useEffect, useState } from "react";
import { Box, Grid, InputAdornment, TextField } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useThemeProvider } from "../../utils/themeProvider/CustomThemeProvier";
import { getAccountList } from "../../../middleware/firebase/FireStoreUtils";
const EntryInfo = ({ entries }) => {
  const { theme } = useThemeProvider();
  const [allAccounts, setAllAccounts] = useState([""]);
  const getParentAccount = (parent) => {
    let parentAccount = "Test";
    parentAccount = allAccounts.filter((account) =>
      account.includes(parent)
    )[0];
    return parentAccount;
  };
  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await getAccountList();
      setAllAccounts(accounts);
    };
    getAccounts();
  }, []);
  const Info = entries.map((entry, index) => (
    <Grid
      item
      xs={6}
      key={`entry-${index}`}
      sx={{
        backgroundColor: theme === "dark" ? "#121212" : "#fff",
        gap: "10px",
        display: "flex",
        flexDirection: "column",
        elevation: 1,
        boxShadow: 7,
        p: 5,
        borderRadius: "10px",
      }}
    >
      <TextField
        variant="standard"
        fullWidth
        label="Parent account"
        value={getParentAccount(entry.parent)}
        InputLabelProps={{ shrink: true }}
        size="small"
        inputProps={{ readOnly: true }}
      />
      <TextField
        variant="standard"
        fullWidth
        label="Entry name"
        value={entry.name}
        size="small"
        inputProps={{ readOnly: true }}
      />
      <TextField
        variant="standard"
        fullWidth
        label="Entry description"
        multiline
        value={entry.description}
        size="small"
        inputProps={{ readOnly: true }}
      />
      <TextField
        variant="standard"
        fullWidth
        label="Entry Type"
        placeholder="Select debit or credit"
        size="small"
        value={entry.type}
        inputProps={{ readOnly: true }}
      ></TextField>
      {entry.amount.map((a, ai) => (
        <Box key={`amount-${ai}`} sx={{ display: "flex", gap: "10px" }}>
          <TextField
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            label="Amount"
            value={Number(a.amount).toFixed(2)}
            size="small"
            inputProps={{ readOnly: true }}
          />
          <TextField
            variant="standard"
            sx={{ width: "600px" }}
            multiline
            value={a.description}
            size="small"
            label="Description"
            inputProps={{ readOnly: true }}
          />
        </Box>
      ))}
      <TextField
        fullWidth
        variant="standard"
        sx={{ width: "500px" }}
        value={entry.total.toFixed(2)}
        size="small"
        label="Total"
        inputProps={{ readOnly: true }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AttachMoneyIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  ));
  return Info;
};

export default EntryInfo;
