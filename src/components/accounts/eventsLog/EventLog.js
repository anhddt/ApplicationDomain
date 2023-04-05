import { Fragment, useEffect, useState } from "react";
import { useThemeProvider } from "../../utils/themeProvider/CustomThemeProvier";
import { AppBar, Box, Drawer, IconButton, Link, Toolbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getAllEvents } from "../../../middleware/firebase/FireStoreUtils";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import {
  headerElement,
  linkStyle,
  toCurrency,
} from "../chartOfAccounts/ChartOfAccounts";
import EventDetail from "./EventDetail";

/**
 * This function compares the date of the event
 * What it does is is get the date as number instead of string
 * then compare them this arrangement is ascending order.
 * As for decending order just switch the order of < and >.
 * @param {*} a
 * @param {*} b
 * @returns -1, 1, or 0
 */
export const f = (a, b) => {
  const x = new Date(a.id).getTime();
  const y = new Date(b.id).getTime();
  if (x > y) {
    return -1;
  } else if (x < y) {
    return 1;
  } else return 0;
};
const EventLog = () => {
  const [drawerContent, setDrawerContent] = useState({});
  const [rows, setRows] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { tableStyles, theme } = useThemeProvider();
  const page = 10;
  const pageSizeOptions = [10, 20, 50, 100];
  const handleCellRender = (cell) => {
    switch (cell.row.field) {
      case "balance":
        return toCurrency.format(cell.value);
      default:
        break;
    }
  };
  // This components wraps the account's name within the link
  // Later when we click on the link it will redirect to the actual
  // account page/sheet with account details
  const toLink = (row) => {
    return (
      <Link
        underline="hover"
        sx={linkStyle}
        component="button"
        onClick={() => handleDrawerOpen(row)}
      >
        {new Date(row.value).toString()}
      </Link>
    );
  };

  const columns = [
    {
      field: "id",
      headerName: "On date",
      type: "string",
      flex: 1,
      renderHeader: (param) => headerElement(param),
      renderCell: (row) => toLink(row),
      minWidth: 425,
    },
    {
      field: "username",
      headerName: "Username",
      flex: 0.3,
      minWidth: 150,
      renderHeader: (param) => headerElement(param),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.2,
      minWidth: 150,
      renderHeader: (param) => headerElement(param),
    },
    {
      field: "accountID",
      headerName: "Account ID",
      type: "number",
      flex: 0.3,
      minWidth: 120,
      renderHeader: (param) => headerElement(param),
    },
    {
      field: "accountName",
      headerName: "Account Name",
      type: "number",
      flex: 0.3,
      minWidth: 200,
      renderHeader: (param) => headerElement(param),
    },
    {
      field: "field",
      headerName: "Field Changed",
      flex: 0.3,
      minWidth: 150,
      renderHeader: (param) => headerElement(param),
    },
    {
      field: "currValue",
      headerName: "Current",
      minWidth: 130,
      flex: 0.2,
      renderHeader: (param) => headerElement(param),
      renderCell: (row) => handleCellRender(row),
    },
    {
      field: "preValue",
      headerName: "Previous",
      minWidth: 130,
      flex: 0.2,
      renderHeader: (param) => headerElement(param),
      renderCell: (row) => handleCellRender(row),
    },
  ];

  /**
   * Trigger everytime the page is loaded for one time.
   * Navigate the page again to refresh the content.
   */
  useEffect(() => {
    const getData = async () => {
      try {
        const events = await getAllEvents();
        const arr = [];
        events.map((event) => arr.push(event.data()));
        const formatedEvents = [];
        arr.map(
          (event, index) =>
            (formatedEvents[index] = {
              id: event.eventDate,
              username: event.user.username,
              action: event.change.type,
              accountID: event.change.row.id,
              accountName: event.change.row.name,
              field: event.change.field,
              currValue: event.change.field
                ? event.change.row[event.change.field]
                : "",
              preValue: event.change.previous ?? "",
            })
        );
        setRows(formatedEvents.sort(f));
      } catch (error) {}
    };
    getData();
  }, []);
  const handleDrawerOpen = (row) => {
    setDrawerContent(rows.filter((item) => item.id === row.id)[0]);
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const GridToolbar = () => (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        backgroundColor:
          theme === "dark" ? "rgba(30, 27, 27, 0.745)" : "rgb(223, 223, 223)",
        pl: "16px",
      }}
    >
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </Box>
  );
  return (
    <Fragment>
      <Box
        sx={{
          height: "83%",
          mb: "60px",
          width: "100%",
          backgroundColor:
            theme === "dark"
              ? "rgba(41, 37, 37, 0.745)"
              : "rgb(246, 243, 243);",
        }}
      >
        <DataGrid
          slots={{
            toolbar: GridToolbar,
          }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: page,
              },
            },
          }}
          pageSizeOptions={pageSizeOptions}
          checkboxSelection
          disableRowSelectionOnClick
          sx={tableStyles}
        />
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => handleDrawerClose()}
          sx={{ zIndex: 1202 }}
        >
          <AppBar
            position="sticky"
            sx={{
              backgroundColor: "inherit",
              boxShadow: "none",
              color: "inherit",
            }}
          >
            <Toolbar>
              <IconButton
                id="menu-item"
                color="inherit"
                edge="start"
                onClick={() => handleDrawerClose()}
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <EventDetail detail={drawerContent} />
        </Drawer>
      </Box>
    </Fragment>
  );
};

export default EventLog;
