import "react-calendar/dist/Calendar.css";
import "./reactCalendar.css";
import { Fragment, useState } from "react";
import Calendar from "react-calendar";
import { IconButton, Menu, MenuItem } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useThemeProvider } from "../../utils/themeProvider/CustomThemeProvier";

/**
 * Customade Icon calendar that actually span a calendar
 * import and supply props for it to work.
 * Supply size: `small`, `medium`, `large`
 * Supply fontSize: `small`, `medium`, `large
 * Supply view: `month`, `year`, `decade`, `century`
 */
const ReactCalendarIcon = (props) => {
  const { theme } = useThemeProvider();
  const { size, fontSize, view, id1, id2 } = { ...props };
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
        id={anchorElCalendar ? id1 : id2}
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
          <Calendar
            className={
              theme === "dark" ? "react-calendar" : "react-calendar-light"
            }
            view={view}
            value={date}
          />
        </MenuItem>
      </Menu>
    </Fragment>
  );
};
export default ReactCalendarIcon;
