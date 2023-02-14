import { useMemo, useState } from "react";
import { Button } from "@mui/material";
import { logOut } from "../../utilities/utils";
import { useNavigate } from "react-router-dom";
import { getUserType } from "../../middleware/verification/userInfo";
import { showIf } from "../utils/conditionalRendering";

const HomePage = () => {
  const [role, setRole] = useState("");
  const navigateTo = useNavigate();
  const handleLogOut = () => {
    logOut(navigateTo);
  };

  useMemo(() => {
    const getRole = async () => {
      const userType = await getUserType();
      setRole(userType);
    };
    getRole();
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          handleLogOut();
        }}
        variant="contained"
      >
        Sign out
      </Button>
      {showIf(
        role === "manager",
        <Button
          onClick={() => {
            handleLogOut();
          }}
          variant="contained"
        >
          Manager sign out
        </Button>
      )}
      {showIf(
        role === "admin",
        <Button
          onClick={() => {
            handleLogOut();
          }}
          variant="contained"
        >
          Admin sign out
        </Button>
      )}
    </>
  );
};

export default HomePage;
