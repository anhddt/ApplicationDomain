import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { useState } from "react";

const HelpButton = (message) => {
  const [open, setOpen] = useState(false);
  const [helpText] = useState(message.message);

  const handleOpen = () => {
    //console.log(helpText);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={handleOpen}
      >
        Help
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Help</DialogTitle>
        <DialogContent>
          <Typography>{helpText}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default HelpButton;
