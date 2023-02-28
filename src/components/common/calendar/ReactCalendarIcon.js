import 'react-calendar/dist/Calendar.css';
import { Fragment, useState } from 'react';
import Calendar from "react-calendar";
import { IconButton, Menu, MenuItem } from '@mui/material';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

/**
 * Customade Icon calendar that actually span a calendar
 * import and supply props for it to work.
 * Supply size: `small`, `medium`, `large`
 * Supply fontSize: `small`, `medium`, `large
 * Supply view: `month`, `year`, `decade`, `century`
 */
const ReactCalendarIcon = (props) => {
    const { size, fontSize, view } = {...props};
    const date = new Date();
    const [expandCalendar, setExpandCalendar] = useState(false);
    const [anchorElCalendar, setAnchorElCalendar] = useState(null);
    const handleOpenCalendar = (e) => {
        setExpandCalendar(!expandCalendar);
        setAnchorElCalendar(e.currentTarget);
    }
    const handleCloseCalendar = () => {
        setExpandCalendar(!expandCalendar);
        setAnchorElCalendar(null);
    };
    return (
        <Fragment>
            <IconButton onClick={(e) => handleOpenCalendar(e)} size={size}color="inherit">
                <CalendarMonthIcon fontSize={fontSize}/>
            </IconButton>
            <Menu
                open={expandCalendar}
                onClose={() => {
                    handleCloseCalendar();
                }}
                anchorEl={anchorElCalendar}
            >
                <MenuItem>
                    <Calendar view={view} value={date}/>
                </MenuItem>
            </Menu>
        </Fragment>
    );
};
export default ReactCalendarIcon;