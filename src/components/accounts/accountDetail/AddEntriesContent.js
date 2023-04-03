import "./addEntry.css";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Tooltip,
  Typography,
  TextField,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CancelIcon from "@mui/icons-material/Cancel";
import { showIf } from "../../utils/conditionalRendering";
import {
  createEntry,
  createEntryEvent,
} from "../../../middleware/firebase/FireStoreUtils";
import { useAuth } from "../../utils/AuthProvider";
import { useThemeProvider } from "../../utils/themeProvider/CustomThemeProvier";
import { createEvent } from "../eventsLog/event";
// import EntryAmount from "./EntryAmount";

/**
 * This component is used as a drawer on the right hand side
 * of the accounting page. When clicking on the add account
 * on the table, this shows up with the steps hard coded below.
 */
const steps = ["Entry name?", "Type", "Amount", "Description"];
const AddEntriesContent = ({ setRefresh }) => {
  const { theme } = useThemeProvider();
  const { user, accountDetailPersistence } = useAuth();
  const blankEntry = {
    id: "",
    parent: accountDetailPersistence.id,
    name: "",
    type: "",
    amount: [],
    total: "",
    description: "",
    status: "Pending",
    comment: "",
    user: user,
  };
  // This is for indicating which step the user is currently on.
  const [currentStep, setCurrentStep] = useState(0);
  const [newEntry, setNewEntry] = useState(blankEntry);
  const [amounts, setAmounts] = useState([{ amount: "", description: "" }]);
  useEffect(() => {
    const date = new Date().toString();
    setNewEntry((rest) => ({
      ...rest,
      id: date,
      amount: amounts,
      total: amounts
        .map((amount) => Number(amount.amount))
        .reduce((a, b) => a + b),
    }));
  }, [amounts]);
  const getName = (index) => {
    if (index === 0) return "name";
    else if (index === 1) return "type";
    else if (index === 2) return "amount";
    else return "description";
  };
  const getPlaceholder = (index) => {
    if (index === 0) return "Entry name";
    else if (index === 1) return "Type";
    else if (index === 2) return "Amount";
    else return "Description";
  };
  const getValue = (index) => {
    if (index === 0) return newEntry.name;
    else if (index === 1) return newEntry.type;
    else return newEntry.description;
  };
  const isDisabled = (index) => {
    if (index === 0) return newEntry.name === "";
    else if (index === 1) return newEntry.type === "";
    else if (index === 2) {
      return amounts[0] ? amounts[0].amount === "" : true;
    } else return false;
  };
  const handleAmountChange = (e, i) => {
    const arr = [...amounts];
    arr[i][e.target.name] = e.target.value;
    setAmounts(arr);
  };
  const handleCancel = () => {
    setNewEntry(blankEntry);
    setAmounts([{ amount: "", description: "" }]);
    setCurrentStep(0);
  };
  // Every time the user types, handle the change here
  const handleChange = (e) => {
    setNewEntry((rest) => ({
      ...rest,
      [e.target.name]: e.target.value,
    }));
  };
  // Add more amounts
  const handleAddMore = () => {
    setAmounts([...amounts, { amount: "", description: "" }]);
  };
  const handleDiscard = () => {
    const arr = [...amounts];
    arr.pop();
    setAmounts(arr);
  };
  // After finishing creating the account,
  // The page reload and the step is reset back to 0.
  const finish = async () => {
    await createEntry(newEntry);
    const e = createEvent(user, newEntry, "new");
    createEntryEvent(e, accountDetailPersistence.id);
    setRefresh((refresh) => !refresh);
    handleCancel();
  };
  const next = (index) => {
    if (index === steps.length - 1) {
      finish();
    } else setCurrentStep((step) => step + 1);
  };
  const back = () => {
    setCurrentStep((step) => step - 1);
  };
  const AddMore = () => (
    <Box>
      <Tooltip title="Add more" placement="right">
        <IconButton
          id={theme === "dark" ? "add-more-button-dark" : "add-more-button"}
          onClick={() => handleAddMore()}
        >
          <AddCircleIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const Amount = amounts.map((amount, index) => (
    <Box
      key={`entry-${index}`}
      sx={{ display: "flex", gap: "5px", mt: 2, mb: 2 }}
    >
      <Box sx={{ display: "flex", gap: "5px" }}>
        <TextField
          name="amount"
          onChange={(e) => {
            handleAmountChange(e, index);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoneyIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          value={amount.amount}
          size="small"
          label="Amount"
          placeholder="Amount"
        />
        <TextField
          sx={{ width: "500px" }}
          multiline
          name="description"
          onChange={(e) => {
            handleAmountChange(e, index);
          }}
          value={amount.description}
          size="small"
          label="Description"
          placeholder="Description"
        />
      </Box>
      <Box>
        <Tooltip title="Discard" placement="right">
          <IconButton
            id={theme === "dark" ? "cancel-x-button-dark" : "cancel-x-button"}
            onClick={() => handleDiscard()}
          >
            <CancelIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  ));
  const Steps = steps.map((step, index) => {
    return (
      <Step key={step}>
        <StepLabel>
          <Typography variant="h6" fontWeight="bold">
            {step}
          </Typography>
        </StepLabel>
        <StepContent>
          {index === 1 && (
            <Select
              sx={{ mb: "10px", width: "200px" }}
              size="small"
              displayEmpty
              name={getName(index)}
              value={newEntry.type}
              required
              onChange={(e) => handleChange(e)}
            >
              <MenuItem disabled value="">
                <em>Select a type</em>
              </MenuItem>
              <MenuItem value={"Debit"}>Debit</MenuItem>
              <MenuItem value={"Credit"}>Credit</MenuItem>
            </Select>
          )}
          {index !== 1 && index !== 2 && (
            <TextField
              sx={{
                mb: "10px",
                width: index === steps.length - 1 ? "350px" : "250px",
              }}
              multiline={index === steps.length - 1}
              name={getName(index)}
              value={getValue(index)}
              placeholder={getPlaceholder(index)}
              onChange={(e) => handleChange(e)}
              size="small"
              onKeyDown={(e) => e.code === "Enter" && next(index)}
            />
          )}
          {index === 2 && Amount}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mb: 2,
              gap: "10px",
            }}
          >
            {index === 2 && <AddMore />}
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Button
                disabled={isDisabled(index)}
                variant="contained"
                onClick={() => next(index)}
              >
                {index === steps.length - 1 ? "Finish" : "Next"}
              </Button>
              {showIf(index > 0, <Button onClick={() => back()}>Back</Button>)}
            </Box>
          </Box>
        </StepContent>
      </Step>
    );
  });
  return (
    <Stepper
      sx={{ ml: "40%", width: "400px" }}
      activeStep={currentStep}
      orientation="vertical"
    >
      {Steps}
    </Stepper>
  );
};
export default AddEntriesContent;
