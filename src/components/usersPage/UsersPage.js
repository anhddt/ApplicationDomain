//a page for system admins to create, edit, and delete users

import "./usersPage.css";
import { useState } from "react";
import { Box, Button, Select, Table } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../utilities/FireStoreUtils";

const UsersPage = () => {
    const printUsers = () => {
        try{
            const data = getUsers();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <>
        <Button onClick={() => {printUsers()}} variant="contained"> 
            Log User Data
        </Button>
        </>
    );
};

export default UsersPage;

