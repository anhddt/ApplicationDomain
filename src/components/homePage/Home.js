import { Button } from "@mui/material";
import { logOut } from "../../utilities/utils"
import { Navigate, useNavigate, NavLink } from "react-router-dom"

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
      <Button variant="contained">
        <NavLink
          to="/users"
          component="button"
        >
          view users
        </NavLink>
      </Button>
    </>);
};

export default HomePage;
