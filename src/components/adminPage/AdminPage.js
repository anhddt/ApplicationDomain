import "./adminpage.css";
import "../utils/themeProvider/themeProvider.css";
import { useThemeProvider } from "../utils/themeProvider/CustomThemeProvier";
import { useEffect, useRef, useState } from "react";
import { Box, Paper } from "@mui/material";
import Homebar from "../common/header/Homebar";
import { getAllUsers } from "../../middleware/firebase/FireStoreUtils";

const AdminPage = () => {
  const { theme } = useThemeProvider();
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
                        <button>Edit</button>
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
    </Paper>
  );
};

export default AdminPage;
