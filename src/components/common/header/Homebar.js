import { AppBar, Toolbar } from "@mui/material";
import LogoIcon from "../logo/LogoIcon";

const Homebar = () => {
    return (
        <AppBar position="sticky" color="inherit">
            <Toolbar>
                <LogoIcon />
            </Toolbar>
        </AppBar>
    );
};

export default Homebar;