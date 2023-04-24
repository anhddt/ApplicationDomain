import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
const CommentDialog = ({ open, onSubmit, row, value, onCancel }) => {
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
      const commentObj = {
        field: "comment",
        formattedValue: "",
        row: {
          entries: row.row.entries,
        },
      };
      onSubmit(commentObj, comment);
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

export default CommentDialog;
