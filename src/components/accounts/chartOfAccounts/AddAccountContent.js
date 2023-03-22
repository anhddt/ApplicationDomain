import { useState } from "react";
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

/**
 * This component is used as a drawer on the right hand side
 * of the accounting page. When clicking on the add account
 * on the table, this shows up with the steps hard coded below.
 */
const steps = ["Account name?", "Category", "Subcategory", "Balance"];
const AddAccountContent = () => {
  // This is for indicating which step the user is currently on.
  const [currentStep, setCurrentStep] = useState(0);
  const [newAccount, setNewAccount] = useState({
    id: 1,
    name: "",
    category: "",
    subCat: "",
    balance:"",
  });
  const getName = (index) => {
    if(index === 0) return "name";
    else if(index === 1) return "category";
    else if(index === 2) return "subCat";
    else return "balance";
  }
  const getPlaceholder = (index) => {
    if(index === 0) return "Account name";
    else if(index === 1) return "Account category";
    else if(index === 2) return "Account sub-category";
    else return "Account balance";
  }
  const getValue = (index) => {
    if(index === 0) return newAccount.name;
    else if(index === 1) return newAccount.category;
    else if(index === 2) return newAccount.subCat;
    else return newAccount.balance;
  }
  const handleCancel = () => {
    setCurrentStep(0);
  };
  // Every time the user types, handle the change here
  const handleChange = (e) => {
    setNewAccount(rest => ({
      ...rest,
      [e.target.name]: e.target.value,
    }));
  };
  // After finishing creating the account,
  // The page reload and the step is reset back to 0.
  const finish = () => {
    console.log(newAccount);
    handleCancel();
    // window.location.reload();
  };
  const next = (index) => {
    if (index === steps.length - 1) {
      finish();
    } else setCurrentStep((step) => step + 1);
  };
  const back = (index) => {
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
        <Box sx={{ display: "flex", mb: 2, gap: "10px" }}>
          <TextField sx={{mb: "10px", width: "200px"}} name={getName(index)} value={getValue(index)} placeholder={getPlaceholder(index)} onChange={(e) => handleChange(e)} size="small"></TextField>
          <Button variant="contained" onClick={() => next(index)}>
            {index === steps.length - 1 ? "Finish" : "Next"}
          </Button>
          {showIf(index > 0, <Button onClick={() => back(index)}>Back</Button>)}
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
