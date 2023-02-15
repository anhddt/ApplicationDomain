import './adminpage.css';
import Box from "@mui/material/Box";
import { Header } from "../common";
import { getUserInfo } from '../../middleware/verification/userInfo';


const AdminPage = () => {

    const users = async () => { 
      const userInfo = await getUserInfo ();
      //change console log to whatever function is needed to process all userInfo
      //console.log (userInfo);
    }
    
  users ()


    return (
      <Box className="screen">
        <Header />
        <Box className="adminBody">
          
        </Box>
      </Box>
    );
  };
  
  export default AdminPage;
  