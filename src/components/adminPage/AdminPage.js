import "./adminpage.css";
import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { Header } from "../common";
import { getAllUsers } from "../../middleware/firebase/FireStoreUtils";

const AdminPage = () => {
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
  );
};

export default AdminPage;
