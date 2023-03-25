import { useMemo, useState } from "react";
import {
  Box,
  Button,
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
  updateAccountingEvents,
} from "../../../middleware/firebase/FireStoreUtils";
import { useAuth } from "../../utils/AuthProvider";
import { createEvent } from "../eventsLog/event";

/**
 * This component is used as a drawer on the right hand side
 * of the accounting page. When clicking on the add account
 * on the table, this shows up with the steps hard coded below.
 */
const steps = ["Account name?", "Category", "Subcategory", "Balance"];
const blankAccount = {
  id: 0,
  name: "",
  category: "",
  subCat: "",
  balance: 0,
  status: "Pending",
};
const AddAccountContent = (props) => {
  const { user } = useAuth();
  // This is for indicating which step the user is currently on.
  const [currentStep, setCurrentStep] = useState(0);
  const [newAccount, setNewAccount] = useState(blankAccount);

  useMemo(() => {
    const getCounter = async () => {
      const counter = await getChartOfAccountsCounter();
      setNewAccount((rest) => ({
        ...rest,
        id: counter,
      }));
    };
    currentStep === steps.length - 1 && getCounter();
  }, [currentStep]);

  const getName = (index) => {
    if (index === 0) return "name";
    else if (index === 1) return "category";
    else if (index === 2) return "subCat";
    else return "balance";
  };
  const getPlaceholder = (index) => {
    if (index === 0) return "Account name";
    else if (index === 1) return "Account category";
    else if (index === 2) return "Account sub-category";
    else return "Account balance";
  };
  const getValue = (index) => {
    if (index === 0) return newAccount.name;
    else if (index === 1) return newAccount.category;
    else if (index === 2) return newAccount.subCat;
    else return newAccount.balance;
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
    const e = createEvent(user, newAccount.id, "newAccountInChart");
    updateAccountingEvents(e);
    props.setRefresh((refresh) => !refresh);
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
        <TextField
          sx={{ mb: "10px", width: "200px" }}
          name={getName(index)}
          value={getValue(index)}
          placeholder={getPlaceholder(index)}
          onChange={(e) => handleChange(e)}
          size="small"
          onKeyDown={(e) => e.code === "Enter" && next(index)}
        />
        <Box sx={{ display: "flex", mb: 2, gap: "10px" }}>
          <Button variant="contained" onClick={() => next(index)}>
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
