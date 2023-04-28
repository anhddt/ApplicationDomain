import {
  Box,
  Grid,
  InputAdornment,
  Link,
  TextField,
  Tooltip,
} from "@mui/material";
import PendingIcon from "@mui/icons-material/Pending";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useThemeProvider } from "../../utils/themeProvider/CustomThemeProvier";
import CustomMoneyFormat from "./CustomMoneyFormat";
import { downloadEntryFile } from "../../../middleware/firebase/FireStoreUtils";

/**
 * When clicking on an entry on the table, a dialog will be shown with the entry's information
 * displayed by these components.
 * Given a list of entries, the function will map out a set of details corresponding to the entries.
 * @param {*} entries the list of entries
 * @returns a map
 */

const Indicator = (status) => {
  switch (status) {
    case "Pending":
      return (
        <Tooltip title="Pending" placement="top">
          <PendingIcon sx={{ color: "info.main" }} />
        </Tooltip>
      );
    case "Approved":
      return (
        <Tooltip title="Approved" placement="top">
          <ThumbUpAltIcon sx={{ color: "success.main" }} />
        </Tooltip>
      );
    case "Rejected":
      return (
        <Tooltip title="Rejected" placement="top">
          <ThumbDownIcon sx={{ color: "error.main" }} />
        </Tooltip>
      );
    default:
      return <></>;
  }
};

const EntryInfo = ({ entries }) => {
  const { theme } = useThemeProvider();
  const handleDownloadFile = (file) => {
    downloadEntryFile(file);
  };
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
        value={entry.parentLabel}
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
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              {Indicator(entry.status)}
            </InputAdornment>
          ),
        }}
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
            value={a.amount}
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon fontSize="small" />
                </InputAdornment>
              ),
              inputComponent: CustomMoneyFormat,
            }}
            label="Amount"
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
        value={entry.total}
        size="small"
        label="Total"
        inputProps={{ readOnly: true }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AttachMoneyIcon fontSize="small" />
            </InputAdornment>
          ),
          inputComponent: CustomMoneyFormat,
        }}
      />
      {entry.files.length > 0 &&
        entry.files.map((file, i) => (
          <Link
            key={`${file.path}-${i}`}
            onClick={() => handleDownloadFile(file)}
          >
            {file.name}
          </Link>
        ))}
    </Grid>
  ));
  return Info;
};

export default EntryInfo;
