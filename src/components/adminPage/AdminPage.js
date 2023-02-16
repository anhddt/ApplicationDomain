import './adminpage.css';
import Box from "@mui/material/Box";
import { Header } from "../common";
import { firestore } from '../../firebase';
import { getDocs, collection } from 'firebase/firestore';




const AdminPage = () => {
  // const getUsers = async () => {
  //   try {
  //       let userMap = new Map();
  //       const querySnapshot = await getDocs(collection(firestore, "newUsers"));
  //       querySnapshot.forEach(function(doc) {
  //           console.log(doc.data().userName);
  //           console.log(doc.data());
  //           userMap.set(doc.data().userName, doc.data());
  //       });

  //       for (let [key, value] of userMap) {
  //         console.log(key + " = " + value.map((key, value) => value));
  //         }
  //       return userMap;
  //   } catch (error) {
  //       console.log(error);
  //   }
  // }
  // getUsers();
  
    
    const users2 = [
      { firstName: "Jack", lastName: "Smith", email: "22@22.com", password: "********"},
      { firstName: "Meghan", lastName: "Dee", email: "22@22.com", password: "********" },
      { firstName: "John", lastName: "Doe", email: "22@22.com", password: "********"},
      { firstName: "Sierra", lastName: "Brown", email: "22@22.com", password: "********"},
      { firstName: "Evan", lastName: "Jackson", email: "22@22.com", password: "********" },
      { firstName: "Katie", lastName: "Kat", email: "22@22.com", password: "********"},
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
                <th>Password</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              {users2.map((val, key) => {
                return (
                  <tr key = {key}>
                    <td>{val.firstName}</td>
                    <td>{val.lastName}</td>
                    <td>{val.email} <button onClick={'/'}>Contact User</button></td>
                    <td>{val.password}</td>
                    <td><button onClick={'/'}>Edit</button></td>
                    <td><button onClick={'/'}>Delete</button></td>
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
  