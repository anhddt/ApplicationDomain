import "./accountingpage.css";
import "../utils/themeProvider/themeProvider.css";
import { useThemeProvider } from "../utils/themeProvider/CustomThemeProvier";
import { useEffect, useRef, useState } from "react";
import { Box, Paper} from "@mui/material";
import Homebar from "../common/header/Homebar";
import { getAllUsers } from "../../middleware/firebase/FireStoreUtils";

const AccountingPage = () => {
    const { theme } = useThemeProvider();
    
    //Temp dictionary to fill tables
    const sample1 = [
        {acctNum: "101", acctName: "Sample1", acctDesc: "This is an account"},
        {acctNum: "102", acctName: "Sample2", acctDesc: "This is an account"},
        {acctNum: "103", acctName: "Sample3", acctDesc: "This is an account"},
    ];

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
                    <div className="userTable">
                        <table>
                        <tbody>
                            <tr>
                            <th>Account #</th>
                            <th>Account Name</th>
                            <th>Description</th>
                            <th>View</th>
                            <th>Delete</th>
                            </tr>
                            {sample1.map((val, key) => {
                            return (
                                <tr key={key}>
                                <td>{val.acctNum}</td>
                                <td>{val.acctName}</td>
                                <td>
                                    {val.acctDesc}</td>
                                <td>
                                    <a href="/accountdetail">
                                        <button>View</button>
                                    </a>
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
        </Paper>
    )
}

export default AccountingPage;