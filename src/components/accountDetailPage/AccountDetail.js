import "./accountdetail.css";
import "../utils/themeProvider/themeProvider.css";
import { useThemeProvider } from "../utils/themeProvider/CustomThemeProvier";
import { Box, Paper } from "@mui/material";
import Homebar from "../common/header/Homebar";

const AccountDetail = () => {
    const { theme } = useThemeProvider();

    //Temp dictionary to fill tables
    const sample1 = [
        {transNum: "201", transDesc: "Placeholder", transDate: "11/16/2022", transDebit: "+100", transCredit: "-100"},
        {transNum: "202", transDesc: "Placeholder", transDate: "08/09/2022", transDebit: "+1000", transCredit: "-1000"},
        {transNum: "203", transDesc: "Placeholder", transDate: "03/15/2022", transDebit: "-200", transCredit: "+200"},
        {transNum: "204", transDesc: "Placeholder", transDate: "02/21/2022", transDebit: "-2000", transCredit: "+2000"},

    ];

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
                    <div className="userTable">
                        <table>
                        <tbody>
                            <tr>
                            <th>Transaction #</th>
                            <th>Transaction Description</th>
                            <th>Transaction Date</th>
                            <th>Debit</th>
                            <th>Credit</th>
                            </tr>
                            {sample1.map((val, key) => {
                            return (
                                <tr key={key}>
                                <td>{val.transNum}</td>
                                <td>{val.transDesc}</td>
                                <td>{val.transDate}</td>
                                <td>{val.transDebit}</td>
                                <td>{val.transCredit}</td>
                                </tr>
                            );
                            })}
                        </tbody>
                        </table>
                    </div>

                </Box>
            </Box>
        </Paper>
    );
};

export default AccountDetail;