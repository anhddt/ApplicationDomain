import { useMemo, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
  TextField,
} from "@mui/material";
import { showIf } from "../../utils/conditionalRendering";
import {
  createAccount,
  getChartOfAccountsCounter,
  setChartOfAccountsCounter,
  createAccountEvent,
} from "../../../middleware/firebase/FireStoreUtils";
import { useAuth } from "../../utils/AuthProvider";
import { createEvent } from "../eventsLog/event";

/**
 * This component is used as a drawer on the right hand side
 * of the accounting page. When clicking on the add account
 * on the table, this shows up with the steps hard coded below.
 */
const steps = [
  "Account name:",
  "Description:",
  "Normal side:",
  "Category:",
  "Subcategory:",
  "Comment:",
  "Statement:",
];
const blankAccount = {
  id: 0,
  name: "",
  normalSide: "",
  category: "",
  balance: 0,
  subCat: "",
  description: "",
  action: "",
  comment: "",
  statement: "",
  status: "Active",
  createdDate: "",
  modifiedDate: "",
};

/**
 * This is a series of seteps for a user to follow when they want to make a new account.
 * @param {*} param0
 * @returns
 */
const AddAccountContent = ({ setRefresh }) => {
  const { user } = useAuth();
  // This is for indicating which step the user is currently on.
  const [currentStep, setCurrentStep] = useState(0);
  const [newAccount, setNewAccount] = useState(blankAccount);

  /**
   * A counter is stored in the backend to serve as a uid for the account.
   * As an attempt to prevent multiple accesss to the counter,
   * the counter is retrieved once the process is nearly complete.
   */
  useMemo(() => {
    const getCounter = async () => {
      const counter = await getChartOfAccountsCounter();
      setNewAccount((rest) => ({
        ...rest,
        id: counter,
        createdDate: new Date().toISOString(),
      }));
    };
    currentStep === steps.length - 1 && getCounter();
  }, [currentStep]);

  const getName = (index) => {
    switch (index) {
      case 0:
        return "name";
      case 1:
        return "description";
      case 2:
        return "normalSide";
      case 3:
        return "category";
      case 4:
        return "subCat";
      case 5:
        return "comment";
      default:
        return "statement";
    }
  };

  const getPlaceholder = (index) => {
    if (index === 0) return "Account name";
    else if (index === 1) return "Description";
    else if (index === 4) return "Account sub-category";
    else return "Comment";
  };
  const getValue = (index) => {
    switch (index) {
      case 0:
        return newAccount.name;
      case 1:
        return newAccount.description;
      case 2:
        return newAccount.normalSide;
      case 3:
        return newAccount.category;
      case 4:
        return newAccount.subCat;
      case 5:
        return newAccount.comment;
      default:
        return newAccount.statement;
    }
  };

  const isDisabled = (index) => {
    if (index === 1 || index === 5) return false;
    return getValue(index) === "";
  };
  const handleCancel = () => {
    setNewAccount(blankAccount);
    setCurrentStep(0);
  };
  // Every time the user types, handle the change here
  const handleChange = (e) => {
    setNewAccount((rest) => ({
      ...rest,
      [e.target.name]: e.target.value,
    }));
  };
  // After finishing creating the account,
  // The page reload and the step is reset back to 0.
  const finish = async () => {
    createAccount(newAccount);
    await setChartOfAccountsCounter(newAccount.id + 1);
    const e = createEvent(user, newAccount, "new");
    createAccountEvent(e);
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

  const Steps = steps.map((step, index) => (
    <Step key={step}>
      <StepLabel>
        <Typography variant="h6" fontWeight="bold">
          {step}
        </Typography>
      </StepLabel>
      <StepContent>
        {(index === 2 || index === 3) && (
          <Select
            sx={{ mb: "10px", width: "200px" }}
            size="small"
            displayEmpty
            name={getName(index)}
            value={getValue(index)}
            required
            onChange={(e) => handleChange(e)}
          >
            <MenuItem disabled value="">
              <em>
                {index === 2 ? "Select normal side" : "Select a category"}
              </em>
            </MenuItem>
            <MenuItem value={index === 2 ? "Debit" : "Assets"}>
              {index === 2 ? "Debit" : "Assets"}
            </MenuItem>
            <MenuItem value={index === 2 ? "Credit" : "Liabilities"}>
              {index === 2 ? "Credit" : "Liabilities"}
            </MenuItem>
            {index === 3 && <MenuItem value={"Equity"}>Equity</MenuItem>}
          </Select>
        )}
        {index === 6 && (
          <Select
            sx={{ mb: "10px", width: "300px" }}
            size="small"
            displayEmpty
            name={getName(index)}
            value={getValue(index)}
            required
            onChange={(e) => handleChange(e)}
          >
            <MenuItem disabled value="">
              <em>Select a statement</em>
            </MenuItem>
            <MenuItem value="BS">{"BS (balance sheets)"}</MenuItem>
            <MenuItem value="CF">{"CF (cash flow statement)"}</MenuItem>
            <MenuItem value="CI">{"CI (change in equity statement)"}</MenuItem>
            <MenuItem value="IS">{"IS (income statement)"}</MenuItem>
            <MenuItem value="RE">{"RE (retained earning statement)"}</MenuItem>
          </Select>
        )}
        {index !== 2 && index !== 3 && index !== 6 && (
          <TextField
            sx={{
              mb: "10px",
              width: index === steps.length - 1 ? "350px" : "250px",
            }}
            multiline={index === 1 || index === 5}
            name={getName(index)}
            value={getValue(index)}
            placeholder={getPlaceholder(index)}
            onChange={(e) => handleChange(e)}
            size="small"
          />
        )}
        <Box sx={{ display: "flex", mb: 2, gap: "10px" }}>
          <Button
            disabled={isDisabled(index)}
            variant="contained"
            onClick={() => next(index)}
          >
            {index === steps.length - 1 ? "Finish" : "Next"}
          </Button>
          {showIf(index > 0, <Button onClick={() => back()}>Back</Button>)}
        </Box>
      </StepContent>
    </Step>
  ));
  return (
    <Stepper
      sx={{ ml: "50px", width: "400px" }}
      activeStep={currentStep}
      orientation="vertical"
    >
      {Steps}
    </Stepper>
  );
};
export default AddAccountContent;
