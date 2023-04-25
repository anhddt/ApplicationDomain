import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

/**
 * When the user rejects an entry, the user is required to enter a comment.
 * This renders a dialog with a text field that allows the user to enter their comment.
 * Once the comment is entered. The user can click Yes to submit the decision.
 * This triggers the onSubmit callback provided by the parent component.
 * @param {*} onSubmit handle the change on the target row on the table when committing.
 * @param {*} open to tell whether the dialog should be opened or closed
 * @param {*} row a target row that is being edited
 * @param {*} value a value from a targeted cell of that row
 * @param {*} onCancel handle the canceling process when comitting/canceling/closing the dialog
 * @returns A dialog object with a text field.
 */
const RejectCommentDialog = ({ open, onSubmit, row, value, onCancel }) => {
  const [comment, setComment] = useState("");
  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleClickCancel = () => {
    setComment("");
    onCancel();
  };
  const handleClickClose = async () => {
    onSubmit(row, value);
    setTimeout(async () => {
      const copy = row;
      copy.field = "comment";
      copy.formattedValue = copy.row.comment;
      onSubmit(copy, comment);
    }, 2000);
    handleClickCancel();
  };
  return (
    <Dialog open={open} onClose={() => handleClickCancel()}>
      <DialogTitle sx={{ fontWeight: "bold" }}>
        Please provide a comment.
      </DialogTitle>
      <DialogContent>
        <TextField
          sx={{
            width: "350px",
          }}
          multiline
          value={comment}
          placeholder={"You must enter a comment to reject an entry."}
          onChange={(e) => handleChange(e)}
          size="small"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => handleClickClose()}>
          Yes
        </Button>
        <Button
          variant="contained"
          onClick={() => handleClickCancel()}
          autoFocus
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RejectCommentDialog;
