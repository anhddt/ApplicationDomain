import { Fragment, useEffect, useState } from "react";
import { useThemeProvider } from "../../utils/themeProvider/CustomThemeProvier";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getDataBulk } from "../../../middleware/firebase/FireStoreUtils";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import EventDetail from "./EventDetail";
const headerElement = (param) => (
  <Typography sx={{ fontWeight: "bold" }} variant="subtitle1">
    {param.colDef.headerName}
  </Typography>
);
const linkStyle = {
  color: "primary.main",
  fontSize: "14px",
};
const toCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/**
 * This function compares the date of the event
 * What it does is is get the date as number instead of string
 * then compare them this arrangement is ascending order.
 * As for decending order just switch the order of < and >.
 * @param {*} a
 * @param {*} b
 * @returns -1, 1, or 0
 */
const f = (a, b) => {
  const x = new Date(a.id).getTime();
  const y = new Date(b.id).getTime();
  if (x > y) {
    return -1;
  } else if (x < y) {
    return 1;
  } else return 0;
};
const EventLog = () => {
  const [allEvents, setAllEvents] = useState({});
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
        {row.value}
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
      width: 500,
    },
    {
      field: "username",
      headerName: "Username",
      flex: 0.3,
      minWidth: 100,
      renderHeader: (param) => headerElement(param),
    },
    {
      field: "type",
      headerName: "Type",
      flex: 0.2,
      minWidth: 100,
      renderHeader: (param) => headerElement(param),
    },
    {
      field: "accountID",
      headerName: "Made change to ID",
      type: "number",
      flex: 0.3,
      minWidth: 180,
      renderHeader: (param) => headerElement(param),
    },
    {
      field: "field",
      headerName: "Field Changed",
      flex: 0.3,
      minWidth: 110,
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
      const rawData = await getDataBulk("accounting", "accountingEvents");
      setAllEvents(rawData);
      const filteredData = {};
      Object.keys(rawData).forEach((key) => {
        filteredData[key] = {
          id: rawData[key].eventDate.toDate().toString(),
          username: rawData[key].user.username,
          type: rawData[key].change.type,
          accountID: rawData[key].change.row?.id ?? rawData[key].change.id,
          field: rawData[key].change.field ?? "",
          currValue: rawData[key].change.field
            ? rawData[key].change.row[rawData[key].change.field]
            : "",
          preValue: rawData[key].change.previous ?? "",
        };
      });
      setRows(Object.values(filteredData).sort(f));
    };
    getData();
  }, []);
  const handleDrawerOpen = (row) => {
    setDrawerContent(allEvents[row.id]);
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
          display: "flex",
          width: "100%",
          backgroundColor: theme === "dark" ? "#121212" : "rgb(246, 243, 243)",
          flexGrow: 1,
        }}
      >
        <Typography
          variant="h4"
          sx={{ mt: "20px", ml: "20px", fontWeight: "bold" }}
        >
          {" "}
          Event log
        </Typography>
      </Box>
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
