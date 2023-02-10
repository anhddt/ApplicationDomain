import { Button } from "@mui/material";
import { logOut } from "../../utilities/utils"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const navigateTo = useNavigate();
  const handleLogOut = () => {
    logOut(navigateTo);
  };
  return (
    <>
      <Button onClick={() => {handleLogOut()}} variant="contained">
        Sign out
      </Button>
    </>);
};

export default HomePage;
