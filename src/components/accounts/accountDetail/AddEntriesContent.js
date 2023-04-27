import "./addEntry.css";
import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Tooltip,
  Typography,
  TextField,
  Link,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CancelIcon from "@mui/icons-material/Cancel";
import ErrorIcon from "@mui/icons-material/Error";
import {
  createEntry,
  createEntryEvent,
  createJournal,
  getAccountList,
} from "../../../middleware/firebase/FireStoreUtils";
import { useAuth } from "../../utils/AuthProvider";
import { useThemeProvider } from "../../utils/themeProvider/CustomThemeProvier";
import { createEvent } from "../eventsLog/event";
import {
  entriesBalance,
  isGood,
} from "../../../middleware/verification/userInfo";
import CustomMoneyFormat from "./CustomMoneyFormat";
import {
  ref,
  uploadBytes,
  getStorage,
  getDownloadURL,
} from "firebase/storage";

/**
 * This component is used as a drawer on the right hand side
 * of the accounting page. When clicking on the add account
 * on the table, this shows up with the steps hard coded below.
 */
const AddEntriesContent = ({ parent }) => {
  const [allAccounts, setAllAccounts] = useState([""]);
  const { theme } = useThemeProvider();
  const { user, accountDetailPersistence } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const [entries, setEntries] = useState([
    {
      id: "",
      parentLabel: "",
      parent: parent ? accountDetailPersistence.id : null,
      name: "",
      type: "",
      amount: [{ amount: "", description: "" }],
      total: 0,
      description: "",
      status: "Pending",
      comment: "",
      user: user,
      journal: "",
      files: [],
    },
    {
      id: "",
      parentLabel: "",
      parent: null,
      name: "",
      type: "",
      amount: [{ amount: "", description: "" }],
      total: 0,
      description: "",
      status: "Pending",
      comment: "",
      user: user,
      journal: "",
      files: [],
    },
  ]);
  // This is for indicating which step the user is currently on.
  /**
   * Once a field is filled in the useEffect picked up the changes
   * and automatically update the changes to the newEntry variable.
   */
  useEffect(() => {
    const getAllAccounts = async () => {
      const accounts = await getAccountList();
      setAllAccounts(accounts);
    };
    getAllAccounts();
  }, []);

  const getParentAccount = (parent) => {
    return allAccounts.filter((account) => account.includes(parent))[0] || null;
  };

  const handleAutocomplete = (v, i) => {
    if (v !== null) {
      const arr = [...entries];
      arr[i].parent = Number(v.substr(0, v.indexOf(" ")));
      arr[i].parentLabel = v;
      setEntries(arr);
    }
  };

  const handleFileChange = (file, index) => {
    const temparr = entries;
    temparr[index].files.push(file)
    setEntries(temparr);
    console.log(temparr);
  }

  //Upload feature!
  const UploadDownload = ({index, onChange}) => {
    // State to store uploaded file
    const [file, setFile] = useState("");
    // Select file to upload
    function handleChange(event) {
        setFile(event.target.files[0]);
    }
    
    // Method to upload files
    const handleUpload = (event) => {
        onChange('files/' + file.name, index);
        event.preventDefault();
        const storage = getStorage();
        const storageRef = ref(storage, 'files/' + file.name);
            
        // Receives the storage reference and the file to upload.
        uploadBytes(storageRef, file);
    };

    // Method to download files


    return(
        <form>
            <Box className="uploader-box">
                <input type="file" onChange={handleChange} />
                <button onClick={handleUpload}>Upload</button>


            </Box>
        </form>
    );
};

  const DownloadComp = ({file}) => {
    console.log(file ?file: "no file");
    const handleDownload = async(event) => {
      event.preventDefault();
      const storage = getStorage();
      const storageRef = ref(storage, file);
      // Get the download URL
      getDownloadURL(storageRef)
      .then((url) => {

          window.open(url, "_blank");
      })
    };
    console.log(file);
    return(
      <Box>
        <Link onClick = {(e) => handleDownload(e)}>{file}</Link>
        
      </Box>
    )
  }

  const DownloadLinks = ({files}) => {
    console.log(files.length > 0 ?files: "no file");
    return(
      <Box>
        {files.map(
          
          file => (
          <Box key = {file}>
            <DownloadComp file = {file}>
            
            </DownloadComp>
          </Box>
          
          )
      
        )}

      </Box>
    )
  }

  const handleEntryChange = (e, i) => {
    const arr = [...entries];
    arr[i][e.target.name] = e.target.value;
    setEntries(arr);
  };

  const handleAmountChange = (e, ai, i) => {
    const name = e.target.name;
    const value = e.target.value;
    const arr = [...entries];
    if (name === "amount") {
      arr[i].amount[ai][name] = parseFloat(value);
      arr[i].total = arr[i].amount
        .map((amt) => Number(amt.amount))
        .reduce((a, b) => a + b);
    } else arr[i].amount[ai][name] = value;
    setEntries(arr);
  };

  const handleDiscard = (ai, i) => {
    const arr = [...entries];
    if (ai === 0 && arr[i].amount.length === 1) {
      arr[i].amount[0] = { amount: "", description: "" };
    } else arr[i].amount.splice(ai, 1);
    arr[i].total = arr[i].amount
      .map((amt) => Number(amt.amount))
      .reduce((a, b) => a + b);
    setEntries(arr);
  };
  // Add more amounts
  const handleAddMore = (i) => {
    const arr = [...entries];
    arr[i].amount.push({ amount: "", description: "" });
    setEntries(arr);
  };

  const handleCancel = () => {
    setEntries([
      {
        id: "",
        parentLabel: "",
        parent: null,
        name: "",
        type: "",
        amount: [{ amount: "", description: "" }],
        total: 0,
        description: "",
        status: "Pending",
        comment: "",
        user: user,
        journal: "",
        files: [],
      },
      {
        id: "",
        parentLabel: "",
        parent: null,
        name: "",
        type: "",
        amount: [{ amount: "", description: "" }],
        total: 0,
        description: "",
        status: "Pending",
        comment: "",
        journal: "",
        files: [],
      },
    ]);
  };
  // After finishing creating the account,
  // The page reload and the step is reset back to 0.
  const finish = async () => {
    const arr = [...entries];
    const ready = isGood(arr);
    if (ready[0]) {
      if (entriesBalance(arr)) {
        const date = new Date().toISOString();
        if (arr[0].parent === accountDetailPersistence.id)
          arr[0].parentLabel = allAccounts.filter((account) =>
            account.includes(arr[0].parent)
          )[0];
        for (let i = 0; i <= arr.length - 1; i++) {
          arr[i].id = date;
          arr[i].journal = date;
          const e = createEvent(user, arr[i], "new");
          createEntry(arr[i]);
          createEntryEvent(e, arr[i].parent);
        }
        const journal = {
          id: date,
          entries: [
            {
              parent: arr[0].parent,
              type: arr[0].type,
              amount: arr[0].total,
              entry: arr[0].id,
            },
            {
              parent: arr[1].parent,
              type: arr[1].type,
              amount: arr[1].total,
              entry: arr[1].id,
            },
          ],
          status: "Pending",
        };
        createJournal(journal);
        handleCancel();
      } else {
        setOpen(true);
        setErrorMessage(
          "Debit and Credit are not balanced.\nPlease re-adjust amounts."
        );
      }
    } else {
      setOpen(true);
      setErrorMessage(ready[1]);
    }
  };

  const handleClickClose = () => {
    setOpen(false);
  };
  const EntryInfo = entries.map((entry, index) => (
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
      <Typography variant="h5">New entry</Typography>
      <Autocomplete
        options={allAccounts}
        sx={{ width: "400px" }}
        renderInput={(param) => (
          <TextField
            {...param}
            size="small"
            required
            placeholder="Select a parent account"
            label="Parent account"
          />
        )}
        value={getParentAccount(entry.parent)}
        onChange={(e, v) => handleAutocomplete(v, index)}
      />
      <TextField
        required
        fullWidth
        label="Entry name"
        name="name"
        value={entry.name}
        placeholder="Enter entry name here"
        onChange={(e) => handleEntryChange(e, index)}
        size="small"
      />
      <TextField
        fullWidth
        label="Entry description"
        name="description"
        multiline
        value={entry.description}
        placeholder="Enter description here"
        onChange={(e) => handleEntryChange(e, index)}
        size="small"
      />
      <TextField
        label="Entry Type"
        placeholder="Select debit or credit"
        size="small"
        name="type"
        value={entry.type}
        required
        onChange={(e) => handleEntryChange(e, index)}
        select
      >
        <MenuItem value={"Debit"}>Debit</MenuItem>
        <MenuItem value={"Credit"}>Credit</MenuItem>
      </TextField>
      {entry.amount.map((a, ai) => (
        <Box key={`amount-${ai}`} sx={{ display: "flex", gap: "5px" }}>
          <TextField
            required={ai === 0}
            name="amount"
            onChange={(e) => {
              handleAmountChange(e, ai, index);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon fontSize="small" />
                </InputAdornment>
              ),
              inputComponent: CustomMoneyFormat,
            }}
            value={a.amount}
            size="small"
            label="Amount"
            placeholder={ai === 0 ? "Amount *" : "Amount"}
          />
          <TextField
            sx={{ width: "500px" }}
            multiline
            name="description"
            onChange={(e) => {
              handleAmountChange(e, ai, index);
            }}
            value={a.description}
            size="small"
            label="Description"
            placeholder="Description"
          />
          <Tooltip title="Discard" placement="right">
            <IconButton
              id={theme === "dark" ? "cancel-x-button-dark" : "cancel-x-button"}
              onClick={() => handleDiscard(ai, index)}
            >
              <CancelIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ))}
      <Box>
        <Tooltip title="Add more" placement="right">
          <IconButton
            id={theme === "dark" ? "add-more-button-dark" : "add-more-button"}
            onClick={() => handleAddMore(index)}
          >
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <TextField
        fullWidth
        variant="standard"
        sx={{ width: "500px" }}
        name="total"
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
      <Box>
        <DownloadLinks files = {entry.files}/>
        <UploadDownload onChange = {handleFileChange} index = {index}/>
      </Box>
    </Grid>
  ));
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor:
          theme === "dark" ? "rgba(30, 27, 27, 0.745)" : "rgb(223, 223, 223)",
      }}
    >
      <Grid container sx={{ p: "50px" }}>
        {EntryInfo}
      </Grid>
      <Box sx={{ display: "flex", width: "200px" }}>
        <Button fullWidth variant="contained" onClick={() => finish()}>
          Submit
        </Button>
      </Box>
      <Dialog open={open} onClose={() => handleClickClose()}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            fontWeight: "bold",
          }}
        >
          ERROR!!!{" "}
          <ErrorIcon
            sx={{ color: "error.main", position: "absolute", top: 2, right: 2 }}
            fontSize="large"
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{errorMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => handleClickClose()}
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default AddEntriesContent;
