import { useState } from "react";
import {
  Box,
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
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
  const handleCancel = async () => {
    setCurrentStep(0);
  };
  // After finishing creating the account,
  // The page reload and the step is reset back to 0.
  const finish = async () => {
    handleCancel();
    window.location.reload();
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
