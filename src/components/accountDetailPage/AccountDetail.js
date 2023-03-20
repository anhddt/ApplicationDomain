import "./accountdetail.css";
import "../utils/themeProvider/themeProvider.css";
import { useThemeProvider } from "../utils/themeProvider/CustomThemeProvier";
import { Box, Paper } from "@mui/material";
import Homebar from "../common/header/Homebar";

const AccountDetail = () => {
    const { theme } = useThemeProvider();
    return (
        <Paper>
            <Homebar />
            <Box
                className="acctDetail-screen"
                id={theme === "dark" ? "paper-dark" : "paper-light"}
            >
                <Box
                className="acctDetailBody"
                id={theme === "dark" ? "box-dark" : "box-light"}
                >


                </Box>
            </Box>
        </Paper>
    );
};

export default AccountDetail;