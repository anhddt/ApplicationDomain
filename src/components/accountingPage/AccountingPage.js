import "./accountingpage.css";
import "../utils/themeProvider/themeProvider.css";
import { useThemeProvider } from "../utils/themeProvider/CustomThemeProvier";
import { useEffect, useRef, useState } from "react";
import { Box, Paper } from "@mui/material";
import Homebar from "../common/header/Homebar";
import { getAllUsers } from "../../middleware/firebase/FireStoreUtils";

const AccountingPage = () => {
    const { theme } = useThemeProvider();
    return (
        <Paper>
            <Homebar />
            <Box
                className="accting-screen"
                id={theme === "dark" ? "paper-dark" : "paper-light"}
            >
                <Box
                    className="acctingBody"
                    id={theme === "dark" ? "box-dark" : "box-light"}
                >
                   </Box>
            </Box>
        </Paper>
    )
}

export default AccountingPage;