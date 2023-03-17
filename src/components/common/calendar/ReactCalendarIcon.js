import "react-calendar/dist/Calendar.css";
import "./reactCalendar.css";
import { Fragment, useState } from "react";
import Calendar from "react-calendar";
import { IconButton, Menu, MenuItem } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

/**
 * Customade Icon calendar that actually span a calendar
 * import and supply props for it to work.
 * Supply size: `small`, `medium`, `large`
 * Supply fontSize: `small`, `medium`, `large
 * Supply view: `month`, `year`, `decade`, `century`
 */
const ReactCalendarIcon = (props) => {
  const { size, fontSize, view } = { ...props };
  const date = new Date();
  const [anchorElCalendar, setAnchorElCalendar] = useState(null);
  const handleOpenCalendar = (e) => {
    setAnchorElCalendar(e.currentTarget);
  };
  const handleCloseCalendar = () => {
    setAnchorElCalendar(null);
  };
  return (
    <Fragment>
      <IconButton
        id={anchorElCalendar ? "lid-up-icon" : "menu-item"}
        onClick={(e) => handleOpenCalendar(e)}
        size={size}
        color="inherit"
      >
        <CalendarMonthIcon fontSize={fontSize} />
      </IconButton>
      <Menu
        open={anchorElCalendar ? true : false}
        onClose={() => {
          handleCloseCalendar();
        }}
        anchorEl={anchorElCalendar}
      >
        <MenuItem>
          <Calendar view={view} value={date} />
        </MenuItem>
      </Menu>
    </Fragment>
  );
};
export default ReactCalendarIcon;
