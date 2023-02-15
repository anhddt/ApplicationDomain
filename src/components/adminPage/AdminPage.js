import './adminpage.css';
import Box from "@mui/material/Box";
import { Header } from "../common";
//import { getUserInfo } from '../../middleware/verification/userInfo';
// import { getAuth } from "firebase/auth";




const AdminPage = () => {

    // const users = async () => { 
    //   const userInfo = await getUserInfo ();
    //   //change console log to whatever function is needed to process all userInfo
    //   console.log (userInfo);
    // }
    
    const users2 = [
      { firstName: "Anom", lastName: "Smith", email: "22@22.com" },
      { firstName: "Megha", lastName: "Smith", email: "22@22.com" },
      { firstName: "Subham", lastName: "Smith", email: "22@22.com"},
    
    ]

    return (
      <Box className="screen">
        <Header />
        <Box className="adminBody">
          <div className='userTable'>
            <table>
              <tbody>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
              </tr>
              {users2.map((val, key) => {
                return (
                  <tr key = {key}>
                    <td>{val.firstName}</td>
                    <td>{val.lastName}</td>
                    <td>{val.email}</td>
                  </tr>
                )              
              })}
              </tbody>
            </table>
          </div>

        </Box>
      </Box>
    );
  };
  
  export default AdminPage;
  