import "./adminpage.css";
import Button from '@mui/material/Button';
import { DataGrid} from '@mui/x-data-grid';
import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { Header } from "../common";
import { getAllUsers, getUIDByUserName, getUserProfile, bulkUpdateUserProperty } from "../../middleware/firebase/FireStoreUtils";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AdminPage = () => {

  let username = "";

  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [UID, setUID] = useState([]);

  const renderEditButton = (params) => {
    return (
        
            <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={() => {
                    username = params.row.id;
                    console.log(username);
                    handleClickOpen();
                }}
            >
                Edit
            </Button>
        
    )
}

  const handleClickOpen = () => {
      const getUser = useCallBack(async () => {
        try {
          const UID = await getUIDByUserName(username);
          const user = await getUserProfile(UID);
          setUserInfo((rest) => [...rest, user.data()]);
        } catch (error) {}
      })
    setOpen(true);
  };

  const handleClose = (saveUser) => {
    if (saveUser) {
        console.log("user would be saved");
    }
    setOpen(false);
  };

  const [profiles, setProfiles] = useState([]);
  const refState = useRef(false);

  useEffect(() => {
    if (refState.current) return;
    refState.current = true;
    const allUsers = async () => {
      try {
        const users = await getAllUsers();
        const allDocs = users.docs;
        for (const item of allDocs) {
          setProfiles((rest) => [...rest, item.data()]);
        }
      } catch (error) {}
    };
    allUsers();
  }, []);

  let rows = profiles;
  Array.prototype.forEach.call(rows, (profile) => profile.id = profile.username)

  

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
              }}
          >
              Delete
          </Button>
      </strong>
  )
}

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