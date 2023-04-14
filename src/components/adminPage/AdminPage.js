import "./adminpage.css";
import "../utils/themeProvider/themeProvider.css";
import { useEffect, useRef, useState } from "react";
import {
  getAllUsers,
  bulkUpdateUserProperty,
  removeUser,
} from "../../middleware/firebase/FireStoreUtils";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SendIcon from "@mui/icons-material/Send";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import AddIcon from "@mui/icons-material/Add";

import { useThemeProvider } from "../utils/themeProvider/CustomThemeProvier";
import Homebar from "../common/header/Homebar";
import RegisterForm from "../register/RegisterForm";

const AdminPage = () => {
  const { theme } = useThemeProvider();
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [username, setUsername] = useState("");
  const [UID, setUID] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [UIDS, setUIDS] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const refState = useRef(false);
  const [button, setButton] = useState("");

  const getHeaderColor = () =>
    theme === "dark" ? "rgba(30, 27, 27, 0.745)" : "rgb(223, 223, 223)";
  const getBodyColor = () =>
    theme === "dark" ? "rgba(41, 37, 37, 0.745)" : "rgb(246, 243, 243)";
  const tableStyles = {
    border: "none",
    "& .MuiDataGrid-columnHeaderCheckbox": {
      backgroundColor: getHeaderColor(),
    },
    "& .MuiDataGrid-columnHeader--sortable": {
      backgroundColor: getHeaderColor(),
    },
    "& .MuiDataGrid-footerContainer": {
      backgroundColor: getHeaderColor(),
    },
    "& .MuiDataGrid-virtualScrollerRenderZone": {
      backgroundColor: getBodyColor(),
    },
    "& MuiDataGrid-columnHeaders": {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
  };

  const handleSave = () => {
    setButton("save");
  };

  const handleDelete = () => {
    setButton("delete");
  };

  //closes alert for if the user wants to delete a user
  const closeAlert = () => {
    setShowAlert(false);
    setButton("");
  };

  //closes dialog for adding users
  const HandleNewUserClose = () => {
    setAddUser(false);
  };

  //handles storing changes to user data
  const handleChange = (e) => {
    setUserInfo((existing) => ({
      ...existing,
      [e.target.name]: e.target.value,
    }));
  };

  //gets user id baed on username from the table
  const getProfile = (_username) => {
    for (let i = 0; i < profiles.length; i++) {
      if (profiles[i].username === _username) {
        setUserInfo(profiles[i]);
        setUID(UIDS[i]);
        break;
      }
    }
  };

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
  };

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
  });

  useEffect(() => {
    const updateUser = async () => {
      await bulkUpdateUserProperty(UID, userInfo);
      handleClose();
    };

    const deleteUser = async () => {
      await removeUser(UID);
      closeAlert();
    };

    if (button === "save") {
      try {
        updateUser();
      } catch (error) {}
    } else if (button === "delete") {
      try {
        deleteUser();
      } catch (error) {}
    }
  }, [button, UID, userInfo]);

  //sets rows to be profiles recieved during use effect
  let rows = profiles;
  Array.prototype.forEach.call(
    rows,
    (profile) => (profile.id = profile.username)
  );

  //a function to render edit buttons into the table
  const renderEditButton = (params) => {
    return (
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginLeft: 16 }}
        onClick={() => {
          setUsername(params.row.id);
          getProfile(username);
          handleClickOpen();
          //console.log("username from table: " + params.row.id);
          //console.log("username from table: " + username);
        }}
      >
        Edit
      </Button>
    );
  };

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
            setUsername(params.row.id);
            setShowAlert(true);
          }}
        >
          Delete
        </Button>
      </strong>
    );
  };

  const addNewUser = () => {
    setAddUser(true);
  };

  //defines the columns of the table
  const columns = [
    {
      field: "id",
      headerName: "Username",
      width: 150,
      disableClickEventBubbling: true,
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 150,
      disableClickEventBubbling: true,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 150,
      disableClickEventBubbling: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      disableClickEventBubbling: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      disableClickEventBubbling: true,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 150,
      renderCell: renderEditButton,
      disableClickEventBubbling: true,
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: renderDeleteButton,
      disableClickEventBubbling: true,
    },
  ];

  //edit user contact and role, only view email, name, username

  //returns the table of users and pop out dialouge for editing individual users
  return (
    <Paper>
      <Homebar />
      <Box
        className="admin-screen"
        id={theme === "dark" ? "paper-dark" : "paper-light"}
      >
        <Box
          className="adminBody"
          id={theme === "dark" ? "box-dark" : "box-light"}
        >
          <div className="userTable" style={{ height: 400, width: "100%" }}>
            <DataGrid rows={rows} columns={columns} sx={tableStyles} />
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
                        name="role"
                        label="Role"
                        value={userInfo.role}
                        onChange={(e) => {
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
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleCancel}>Cancel</Button>
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
          <div>
            <Button
              variant="contained"
              size="large"
              color="success"
              startIcon={<AddIcon />}
              style={{
                justifyContent: "center",
                maxWidth: "200px",
                maxHeight: "50px",
                minWidth: "70px",
                minHeight: "50px",
              }}
              onClick={addNewUser}
            >
              Add User
            </Button>
          </div>

          <Dialog open={addUser} onClose={HandleNewUserClose}>
            <RegisterForm
              formName={"Add New User"}
              onClose={HandleNewUserClose}
            />
          </Dialog>
        </Box>
      </Box>
    </Paper>
  );
};
export default AdminPage;
