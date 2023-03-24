import { Fragment, useEffect, useState } from "react";
import { useAuth } from "../../utils/AuthProvider";
import { useThemeProvider } from "../../utils/themeProvider/CustomThemeProvier";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import AddAccountContent from "./AddAccountContent";
import {
  getDataBulk,
  updateAccountingEvents,
  updateChartOfAccounts,
} from "../../../middleware/firebase/FireStoreUtils";
import { createEvent } from "../eventsLog/event";

/**
 * This convert the given number to us currency.
 */
const toCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const linkStyle = {
  color: "primary.main",
  fontSize: "14px",
};

//This styles the tital, category, subtitle, etc. go
const headerElement = (param) => (
  <Typography sx={{ fontWeight: "bold" }} variant="subtitle1">
    {param.colDef.headerName}
  </Typography>
);

/**
 * This renders the table with differnt accounts
 * @returns a table JSX component
 */
const ChartOfAccounts = () => {
  const { currentUser, username, firstName, lastName, role } = useAuth();
  const [refresh, setRefresh] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const { tableStyles, theme } = useThemeProvider();
  const page = 10;
  // This allows the user to choose how many rows to display on each page
  const pageSizeOptions = [10, 20, 50, 100];
  const showDetail = (cell) => {
    console.log(cell);
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
        onClick={() => showDetail(row)}
      >
        {row.value}
      </Link>
    );
  };
  /**
   * This makes the header of the table
   */
  const columns = [
    {
      field: "id",
      headerName: "ID",
      renderHeader: (param) => headerElement(param),
      renderCell: (row) => toLink(row),
      width: 90,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
      renderHeader: (param) => headerElement(param),
      renderCell: (row) => toLink(row),
      editable: true,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 0.5,
      minWidth: 180,
      renderHeader: (param) => headerElement(param),
      editable: true,
    },
    {
      field: "subCat",
      headerName: "Sub-category",
      flex: 1,
      minWidth: 110,
      renderHeader: (param) => headerElement(param),
      editable: true,
    },
    {
      field: "balance",
      headerName: "Balance",
      headerAlign: "right",
      align: "right",
      maxWidth: 130,
      flex: 1,
      editable: true,
      renderHeader: (param) => headerElement(param),
      renderCell: (row) => toCurrency.format(row.value),
    },
    {
      field: "status",
      headerName: "Status",
      type: role === ("admin" || "manager") ? "singleSelect" : "string",
      editable: role === ("admin" || "manager") ? true : false,
      maxWidth: 180,
      flex: 1,
      renderHeader: (param) => headerElement(param),
      valueOptions: ["Pending", "Resolved"],
    },
  ];
  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await getDataBulk("accounting", "chartOfAccounts");
      setRows(Object.values(accounts));
    };
    getAccounts();
  }, [refresh]);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  /**
   * This function updates the cell everytime we changes the value inside the cell.
   * once the cell is updated, an event is created and stored in the event log
   * @param current a current state of the cell
   * @param event an event
   * this is a void function
   * if the event code is Enter or Bab then proceed to update
   * else abort
   */
  const updateCell = async (current, event) => {
    if (event.code === ("Enter" || "Tab")) {
      const user = {
        uid: currentUser.uid,
        email: currentUser.email,
        username: username,
        firstName: firstName,
        lastName: lastName,
      };
      const value = event.target.defaultValue || event.target.textContent;
      current.row[current.field] = value;
      await updateChartOfAccounts(current.row);
      const e = createEvent(user, current, "cell");
      updateAccountingEvents(e);
    }
    setRefresh((refresh) => !refresh);
  };
  // In the future this will just be an array pulled off from the database
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
      <Button variant="contained" onClick={() => handleDrawerOpen()}>
        Add Account
      </Button>
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
          Chart of Accounts
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
          onCellEditStop={(current, event) => updateCell(current, event)}
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
          <AddAccountContent setRefresh={setRefresh} />
        </Drawer>
      </Box>
    </Fragment>
  );
};

export default ChartOfAccounts;
