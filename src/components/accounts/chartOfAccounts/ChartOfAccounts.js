import "./chartOfAccounts.css";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../utils/AuthProvider";
import { useThemeProvider } from "../../utils/themeProvider/CustomThemeProvier";
import {
  Box,
  Button,
  Drawer,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Link,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import AddAccountContent from "./AddAccountContent";
import AccountDetail from "../accountDetail/AccountDetail";
import {
  createAccountEvent,
  deleteAccount,
  getAllAccounts,
  updateChartOfAccounts,
} from "../../../middleware/firebase/FireStoreUtils";
import { createEvent } from "../eventsLog/event";
import { showIf } from "../../utils/conditionalRendering";
import EventLog from "../eventsLog/EventLog";

const f = (a, b) => {
  return a?.id - b?.id;
};
/**
 * This convert the given number to us currency.
 */
export const toCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
export const linkStyle = {
  color: "primary.main",
  fontSize: "14px",
};

//This styles the tital, category, subtitle, etc. go
export const headerElement = (param) => (
  <Typography sx={{ fontWeight: "bold" }} variant="subtitle1">
    {param.colDef.headerName}
  </Typography>
);
/**
 * This function tells whether the balance is negative or positive.
 * @param {*} row
 * @param {*} parentNormalSide
 * @returns negative or positive total
 */
const plusOrMinus = (row) => {
  let number = row.balance;
  if (row.normalSide === "Credit") {
    if (number === 0);
    else number *= -1;
  }
  return number;
};

/**
 * This function gets the balance of the array in the param
 * @param {*} array
 * @param {*} parentNormalSide
 * @returns
 */
const getBalance = (array) => {
  let balance = 0;
  if (array.length > 0)
    balance = array
      .map((row) => plusOrMinus(row))
      .reduce((total, amount) => amount + total);
  return balance;
};
/**
 * This renders the table with differnt accounts
 * Admin can change anything except the id and the balance of the account
 * Account can be disabled at any balance but can only be deleted when balance is 0.
 * @returns a table JSX component
 */
const ChartOfAccounts = () => {
  const { role, user, accountDetailPersistence, setAccountDetailPersistence } =
    useAuth();
  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [balance, setBalance] = useState(0);
  const [tab, setTab] = useState(0);
  const [showInfo, setShowInfo] = useState(accountDetailPersistence.open);
  const [refresh, setRefresh] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const { tableStyles, theme } = useThemeProvider();
  const page = 20;
  // This allows the user to choose how many rows to display on each page
  const pageSizeOptions = [5, 10, 20, 50, 100];
  const handleClose = () => {
    setShowInfo(false);
    setAccountDetailPersistence((rest) => ({ ...rest, open: false }));
    setRefresh((r) => !r);
  };
  const showDetail = (cell) => {
    const id = cell.id;
    setAccountDetailPersistence({
      open: true,
      normalSide: cell.row.normalSide,
      id: id,
    });
    setShowInfo(true);
  };
  const handleTab = (newTab) => {
    setTab(newTab);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  /**
   * Delete an account
   * The account has to be 0 balance before it can be deleted.
   */
  const handleDeleteAccount = async () => {
    const currents = [];
    selectedRows.map((row) =>
      currents.push({
        id: row,
        name: filteredRows.filter((r) => r.id === row)[0].name,
      })
    );
    await deleteAccount(selectedRows);
    handleClickClose();
    for (const current of currents) {
      setTimeout(() => {
        const e = createEvent(user, current, "delete");
        createAccountEvent(e);
      }, 2000);
    }
    setSelectedRows([]);
    setRefresh((r) => !r);
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
      flex: 0.5,
      minWidth: 250,
      renderHeader: (param) => headerElement(param),
      renderCell: (row) => toLink(row),
      editable: role === "admin",
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
      flex: 0.5,
      renderHeader: (param) => headerElement(param),
      editable: role === "admin",
    },
    {
      field: "normalSide",
      headerName: "Normal Side",
      headerAlign: "center",
      width: 150,
      renderHeader: (param) => headerElement(param),
      renderCell: (row) => (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            pr: "15px",
            pl: "15px",
            backgroundColor:
              row.value === "Debit"
                ? theme === "dark"
                  ? "info.dark"
                  : "info.light"
                : theme === "dark"
                ? "error.dark"
                : "error.light",
          }}
        >
          <Typography textAlign={row.value === "Debit" ? "left" : "right"}>
            {row.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      type: role === "admin" ? "singleSelect" : "string",
      flex: 0.2,
      minWidth: 180,
      renderHeader: (param) => headerElement(param),
      editable: role === "admin",
      valueOptions: ["Assets", "Liabilities", "Equity"],
    },
    {
      field: "subCat",
      headerName: "Sub-category",
      flex: 0.5,
      minWidth: 200,
      renderHeader: (param) => headerElement(param),
      editable: role === "admin",
    },
    {
      field: "statement",
      headerName: "Statement",
      type: role === "admin" ? "singleSelect" : "string",
      minWidth: 130,
      renderHeader: (param) => headerElement(param),
      editable: role === "admin",
      valueOptions: ["BS", "CF", "CI", "IS", "RE"],
    },
    {
      field: "balance",
      headerName: "Balance",
      headerAlign: "right",
      align: "right",
      width: 130,
      renderHeader: (param) => headerElement(param),
      renderCell: (row) =>
        row.value >= 0
          ? toCurrency.format(row.value)
          : `(${toCurrency.format(row.value * -1)})`,
    },
    {
      field: "comment",
      headerName: "Comment",
      type: "string",
      editable: true,
      width: 250,
      renderHeader: (param) => headerElement(param),
    },
    {
      field: "createdDate",
      headerName: "Created On",
      type: "date",
      flex: 1,
      renderHeader: (param) => headerElement(param),
      renderCell: (row) => row.value.toString(),
      valueGetter: ({ value }) => new Date(value),
      minWidth: 420,
    },
    {
      field: "modifiedDate",
      headerName: "Modified On",
      type: "date",
      flex: 1,
      renderHeader: (param) => headerElement(param),
      renderCell: (row) => row.value === null ? "N/A" : new Date(row.value).toString(),
      valueGetter: ({ value }) => value === "" ? null : new Date(value),
      minWidth: 420,
    },
    {
      field: "status",
      headerName: "Status",
      type: role === "admin" ? "singleSelect" : "string",
      editable: role === "admin",
      width: 120,
      renderHeader: (param) => headerElement(param),
      valueOptions: ["Active", "Disabled"],
    },
  ];
  const getColumns = () => {
    if (role !== "admin") columns.splice(9, 3);
    return columns;
  };
  useMemo(() => {
    setFilteredRows(() => {
      switch (tab) {
        case 1:
          return [];
        case 2:
          return rows.filter((row) => row.balance === 0);
        default:
          return rows;
      }
    });
  }, [tab, rows]);
  useEffect(() => {
    const getAccounts = setTimeout(async () => {
      try {
        const q = await getAllAccounts();
        const arr = [];
        q.map((item) => arr.push(item.data()));
        setRows(
          role === "admin"
            ? arr.sort(f)
            : arr.filter((row) => row.status === "Active").sort(f)
        );
        const balance = getBalance(
          arr.filter((row) => row.status === "Active")
        );
        setBalance(balance);
      } catch (error) {}
    }, 500);
    return () => clearTimeout(getAccounts);
  }, [refresh, role]);
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
    if (event.code === "Enter" || event.code === "Tab") {
      const value = event.target.defaultValue || event.target.textContent;
      const e = createEvent(user, current, "cell");
      current.row[current.field] = value;
      await updateChartOfAccounts(current, value, e.eventDate);
      createAccountEvent(e);
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
        pt: "3px",
      }}
    >
      {role === "admin" && tab === 0 && (
        <Button variant="contained" onClick={() => handleDrawerOpen()}>
          Add Account
        </Button>
      )}
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
      {role === "admin" && tab === 2 && selectedRows.length > 0 && (
        <Button
          id={theme === "dark" ? "delete-button-dark" : "delete-button"}
          variant="contained"
          onClick={() => handleClickOpen()}
        >
          Delete
        </Button>
      )}
      <Dialog open={open} onClose={() => handleClickClose()}>
        <DialogTitle sx={{ fontWeight: "bold" }}>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"Are you sure you want to delete the following account(s)?"}
          </DialogContentText>
          <DialogContentText sx={{ fontWeight: "bold" }}>
            {`To be deleted: ${selectedRows.toString()}.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => handleDeleteAccount()}>
            Yes
          </Button>
          <Button
            variant="contained"
            onClick={() => handleClickClose()}
            autoFocus
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

  const viewTabs = ["Accounts", "Event log", "Delete account"];
  const ViewTabs = viewTabs.map((view, index) => (
    <Tab
      key={`tab-${index}`}
      sx={{
        ":hover":
          theme === "dark"
            ? {
                backgroundColor: "#1a1a1a",
                color: "white",
              }
            : {
                backgroundColor: "#ccefff",
                color: "black",
              },
      }}
      label={view}
    />
  ));
  return (
    <Fragment>
      {showIf(
        !showInfo,
        <Box
          sx={{
            width: "100%",
            height: "100%",
            gap: "2px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: balance === 0 ? "success.main" : "error.main",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              backgroundColor:
                theme === "dark" ? "#121212" : "rgb(246, 243, 243)",
            }}
          >
            <Box
              sx={{
                pt: role === "user" ? "24px" : "auto",
                pb: role === "user" ? "24px" : "auto",
                pl: "50px",
                display: "flex",
                width: "100%",
              }}
            >
              <Typography
                variant="h4"
                sx={{ mt: "20px", ml: "20px", fontWeight: "bold", flexGrow: 1 }}
              >
                {" "}
                Chart of Accounts
              </Typography>
              <Box
                sx={{ display: "flex", gap: "10px", mt: "20px", mr: "20px" }}
              >
                <Box>
                  {balance === 0 ? (
                    <CheckCircleIcon
                      fontSize="large"
                      sx={{
                        color:
                          theme === "dark" ? "success.dark" : "success.light",
                      }}
                    />
                  ) : (
                    <ReportProblemIcon
                      fontSize="large"
                      sx={{
                        color: theme === "dark" ? "error.dark" : "error.light",
                      }}
                    />
                  )}
                </Box>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {`Balance: ${
                    balance >= 0
                      ? toCurrency.format(balance)
                      : `(${toCurrency.format(balance * -1)})`
                  }`}
                </Typography>
              </Box>
            </Box>
            {role === "admin" && (
              <Box
                sx={{
                  pl: "50px",
                  display: "flex",
                  width: "100%",
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Tabs
                  TabIndicatorProps={{
                    sx: {
                      height: "5px",
                      borderRadius: "2px",
                    },
                  }}
                  value={tab}
                  onChange={(e, n) => {
                    handleTab(n);
                  }}
                >
                  {ViewTabs}
                </Tabs>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              minWidth: "100%",
              flexGrow: 1,
              backgroundColor:
                theme === "dark" ? "#121212" : "rgb(246, 243, 243)",
            }}
          >
            {tab !== 1 && (
              <DataGrid
                slots={{
                  toolbar: GridToolbar,
                }}
                rows={filteredRows}
                columns={getColumns()}
                onCellEditStop={(current, event) => updateCell(current, event)}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: page,
                    },
                  },
                  sorting: "ascending",
                  columns: {
                    columnVisibilityModel: {
                      createdDate: false,
                      modifiedDate: false,
                      comment: false,
                    },
                  },
                }}
                pageSizeOptions={pageSizeOptions}
                checkboxSelection
                disableRowSelectionOnClick
                onRowSelectionModelChange={(state) => setSelectedRows(state)}
                rowSelectionModel={selectedRows}
                sx={tableStyles}
              />
            )}
            {tab === 1 && <EventLog />}
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
        </Box>
      )}
      {showIf(showInfo, <AccountDetail onClose={() => handleClose()} />)}
    </Fragment>
  );
};

export default ChartOfAccounts;
