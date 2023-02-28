import "./adminpage.css";
/*import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { Header } from "../common";
import { getAllUsers } from "../../middleware/firebase/FireStoreUtils";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AdminPage = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
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
  return (
    <Box className="admin-screen">
      <Header />
      <Box className="adminBody">
        <div className="userTable">
          <table>
            <tbody>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              {profiles.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.firstName}</td>
                    <td>{val.lastName}</td>
                    <td>
                      {val.email} <button>Contact User</button>
                    </td>
                    <td>{val.password}</td>
                    <td>
                      <Button variant="outlined" onClick={handleClickOpen}>
                        Edit
                      </Button>
                      <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Edit User {val.username} </DialogTitle>
                        <DialogContent>
                          <TextField
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            value = {val.email}
                          />
                          <TextField
                            margin="dense"
                            id="FirstName"
                            label="First Name"
                            type="string"
                            fullWidth
                            variant="standard"
                            value = {val.firstName}
                          />
                          <TextField
                            margin="dense"
                            id="LastName"
                            label="Last Name"
                            type="string"
                            fullWidth
                            variant="standard"
                            value = {val.lastName}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button onClick={handleClose}>Save</Button>
                        </DialogActions>
                      </Dialog>
                    </td>
                    <td>
                      <button>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Box>
    </Box>
  );
};
*/

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { Header } from "../common";
import { getAllUsers } from "../../middleware/firebase/FireStoreUtils";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AdminPage = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
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

  const rows = profiles;
    return (
      <Box className="admin-screen">
      <Header />
      <Box className="adminBody">
        <div className="userTable">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Username </TableCell>
                  <TableCell align="center">First Name</TableCell>
                  <TableCell align="center">Last Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={rows.indexOf(row)}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">{row.username}</TableCell>
                    <TableCell align="center">{row.firstName}</TableCell>
                    <TableCell align="center">{row.lastName}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center"><Button variant="outlined" onClick={handleClickOpen}>Edit</Button></TableCell>
                      <Dialog open={open} onClose={handleClose}>
                          <DialogTitle>Edit User {row.username} </DialogTitle>
                          <DialogContent>
                            <TextField
                              margin="dense"
                              id="email"
                              label="Email Address"
                              type="email"
                              fullWidth
                              variant="standard"
                              value = {row.email}
                            />
                            <TextField
                              margin="dense"
                              id="FirstName"
                              label="First Name"
                              type="string"
                              fullWidth
                              variant="standard"
                              value = {row.firstName}
                            />
                            <TextField
                              margin="dense"
                              id="LastName"
                              label="Last Name"
                              type="string"
                              fullWidth
                              variant="standard"
                              value = {row.lastName}
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleClose}>Save</Button>
                          </DialogActions>
                        </Dialog>
                    <TableCell align="center"><Button variant="outlined">Delete</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Box>
      </Box>
    );
  }
export default AdminPage;

