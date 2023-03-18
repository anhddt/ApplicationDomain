//window.location.reload;


import "./adminpage.css";
import Button from '@mui/material/Button';
import { DataGrid} from '@mui/x-data-grid';
import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { Header } from "../common";
import { getAllUsers, getUserByUserName, getUserProfile, bulkUpdateUserProperty, removeUser } from "../../middleware/firebase/FireStoreUtils";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AdminPage = () => {

  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [username, setUsername] = useState("no selected user");
  const [prevUsername, setPrevUsername] = useState("no selected user")
  const [UID, setUID] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [UIDS, setUIDS] = useState([]);
  const [button, setButton] = useState("");
  const refState = useRef(false);

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
  const handleClose = (saveUser) => {
    if (saveUser) {
        console.log("user would be saved");
    }
    setOpen(false);
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
  }, []);

  //sets rows to be profiles recieved during use effect
  let rows = profiles;
  Array.prototype.forEach.call(rows, (profile) => profile.id = profile.username)

  //gets user info for selected user from table
  useEffect(() => {
    getProfile(username);
    if (button == "edit") {
      console.log("username: " + username, "prevUser: " + prevUsername);
      handleClickOpen();
    } else if (button == "delete") {
      console.log(username);
      console.log(UID);
      //removeUser(UID);
    }
  }, [username]);




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
            setPrevUsername(username);
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
                console.log("delete was clicked");
                setButton("delete");
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
        width: 300,
        disableClickEventBubbling: true,
    },
    {
        field: 'lastName',
        headerName: 'Last Name',
        width: 300,
        disableClickEventBubbling: true,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 100,
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

//returns the table of users and pop out dialouge for editing individual users
return (
  <Box className="admin-screen">
      <Header />
      <Box className="adminBody">
        <div className="userTable" style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
          />
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit User {userInfo.firstName + " " + userInfo.lastName} </DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"

                
              />
              <TextField
                margin="dense"
                id="FirstName"
                label="First Name"
                type="string"
                fullWidth
                variant="standard"
                value = {userInfo.firstName}
              />
              <TextField
                margin="dense"
                id="LastName"
                label="Last Name"
                type="string"
                fullWidth
                variant="standard"
                value = {userInfo.lastName}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Save</Button>
            </DialogActions>
          </Dialog>
        </div>
    </Box>
  </Box>
);
}
export default AdminPage;