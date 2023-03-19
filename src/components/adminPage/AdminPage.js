import "./adminpage.css";
import { useEffect, useRef, useState } from "react";
import { Header } from "../common";
import { getAllUsers, bulkUpdateUserProperty, removeUser } from "../../middleware/firebase/FireStoreUtils";
import { deleteAccount } from "../utils/AuthProvider";
import { DataGrid} from '@mui/x-data-grid';
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SendIcon from "@mui/icons-material/Send";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

const AdminPage = () => {

  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [username, setUsername] = useState("");
  const [UID, setUID] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [UIDS, setUIDS] = useState([]);
  const [button, setButton] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const refState = useRef(false);

  const closeAlert = () => {
    setShowAlert(false);
    setButton("");
  }

  const handleDelete = () => {
    setButton("delete");
    closeAlert();
  }

  const handleChange = (e) => {
    setUserInfo((existing) => ({
      ...existing,
      [e.target.name]: e.target.value,
    }));
  };

  const getProfile = (_username) => {
      for (let i = 0; i < profiles.length; i++) {
          if (profiles[i].username == _username) {
            setUserInfo(profiles[i]);
            setUID(UIDS[i]);
          }
      }
  }
  //handles opening for dialouge
  const handleClickOpen = () => {
    setOpen(true);
  };

  //handles closing for the dialouge
  const handleClose = () => {
    setOpen(false);
    setButton("");
  };

  const handleCancel = () => {
    handleClose();
  }

  const handleSave = () => {
    setButton("save");
    handleClose();
  }
  
  //sets table at page render
  useEffect(() => {
    if (refState.current) return;
    refState.current = true;
    const allUsers = async () => {
      try {
        const users = await getAllUsers();
        const allDocs = users.docs;
        for (const item of allDocs) {
          setProfiles((rest) => [...rest, item.data()]);
          setUIDS((rest) => [...rest, item.id]);
        }
      } catch (error) {}
    };
    allUsers();
  }, []);

  //sets rows to be profiles recieved during use effect
  let rows = profiles;
  Array.prototype.forEach.call(rows, (profile) => profile.id = profile.username)

  //gets user info for selected user from table
  useEffect(() => {
    getProfile(username);
    if (button == "edit") {
      //console.log("username: " + username, "prevUser: " + prevUsername);
      handleClickOpen();
    } else if (button == "delete") {
      try {
        deleteAccount(UID);
        removeUser(UID);
      } catch (error) {
        console.log(error);
      }
      
    }

    if (button == "save") {
    bulkUpdateUserProperty(UID, userInfo);
    }
  }, [username, button]);




//a function to render edit buttons into the table
const renderEditButton = (params) => {
  return (
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => {
            setButton("edit");
            console.log("username from table: " + params.row.id);
            setUsername(params.row.id);
          }}
        >
        Edit
        </Button>    
  )
}

//a function to render delete buttons into the table
const renderDeleteButton = (params) => {
  return (
      <strong>
          <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={() => {
                setButton("delete");
                setShowAlert(true);
                setUsername(params.row.id);
              }}
          >
              Delete
          </Button>
      </strong>
  )
}

//defines the columns of the table
  const columns = [
    {
        field: 'id',
        headerName: 'Username',
        width: 150,
        disableClickEventBubbling: true,
    },
    {
        field: 'firstName',
        headerName: 'First Name',
        width: 150,
        disableClickEventBubbling: true,
    },
    {
        field: 'lastName',
        headerName: 'Last Name',
        width: 150,
        disableClickEventBubbling: true,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 250,
        disableClickEventBubbling: true,
    },
    {
        field: 'edit',
        headerName: 'Edit',
        width: 150,
        renderCell: renderEditButton,
        disableClickEventBubbling: true,
    },
    {
        field: 'delete',
        headerName: 'Delete',
        width: 150,
        renderCell: renderDeleteButton,
        disableClickEventBubbling: true
    },
];

//edit user contact and role, only view email, name, username

//returns the table of users and pop out dialouge for editing individual users
return (
  <Box className="admin-screen">
      <Header />
      <Box className="adminBody">
        <div className="userTable" style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
          />
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit User {userInfo.username}</DialogTitle>
            <DialogContent>

              <form id="user_info_block">
                <Grid container spacing={2}>
                  <Grid xs={6} item>
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <BadgeIcon />
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="standard"
                      label="First name"
                      size="small"
                      value={userInfo.firstName}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <TextField
                      InputProps={{
                      startAdornment: (
                          <InputAdornment position="start">
                            <BadgeIcon />
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="standard"
                      label="Last Name"
                      size="small"
                      value={userInfo.lastName}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SmartphoneIcon />
                          </InputAdornment>
                        ),
                      }}
                    fullWidth
                    name="phone"
                    label="Phone#"
                    size="small"
                    placeholder={userInfo.phone}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HomeIcon />
                          </InputAdornment>
                        ),
                      }}
                    fullWidth
                    name="street"
                    label="Street"
                    size="small"
                    placeholder={userInfo.street}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    />
                  </Grid>
            <Grid xs={6} item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationCityIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                name="city"
                label="City"
                size="small"
                placeholder={userInfo.city}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBalanceIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                name="state"
                label="State"
                size="small"
                placeholder={userInfo.state}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SendIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                name="zip"
                label="Zip"
                size="small"
                placeholder={userInfo.zip}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TravelExploreIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                name="country"
                label="Country"
                size="small"
                placeholder={userInfo.country}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Grid>
            <Grid xs={6} item>
              <InputLabel>Role</InputLabel>
              <Select
              name = "role"
                label="Role"
                value={userInfo.role}
                onChange = {(e) => {
                  handleChange(e);
                }}
              >
                <MenuItem value={"user"}>User</MenuItem>
                <MenuItem value={"manager"}>Manager</MenuItem>
                <MenuItem value={"admin"}>Admin</MenuItem>
              </Select>
            </Grid>
                </Grid>
              </form>

            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
            </DialogActions>
          </Dialog>
          <Dialog open={showAlert} onClose={closeAlert}>
            <DialogTitle>Delete user {userInfo.username}?</DialogTitle>
            <DialogActions>
              <Button onClick={handleDelete}>Yes</Button>
              <Button onClick={closeAlert}>No</Button>
            </DialogActions>
          </Dialog>
        </div>
    </Box>
  </Box>
);
}
export default AdminPage;