import { forwardRef, useEffect, useMemo, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  Drawer,
  IconButton,
  Slide,
  Tab,
  Tabs,
  Toolbar,
  Link,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { useThemeProvider } from "../../utils/themeProvider/CustomThemeProvier";
import { useAuth } from "../../utils/AuthProvider";
import {
  headerElement,
  linkStyle,
  toCurrency,
} from "../chartOfAccounts/ChartOfAccounts";
import {
  DataGrid,
  useGridApiRef,
  gridFilteredSortedRowIdsSelector,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import AddEntriesContent from "./AddEntriesContent";
import {
  getAllEntries,
  getAllEntryEvents,
  createEntryEvent,
  updateEntry,
  updateAccountBalance,
} from "../../../middleware/firebase/FireStoreUtils";
import { f } from "../eventsLog/EventLog";
import { createEvent } from "../eventsLog/event";
import EventDetail from "../eventsLog/EventDetail";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="left" ref={ref} {...props} />;
});

const plusOrMinus = (row, parentNormalSide) => {
  let number = row.total;
  if (parentNormalSide === "Debit") {
    if (row.type === "Credit") {
      if (number === 0);
      else number *= -1;
    }
  } else if (parentNormalSide === "Credit") {
    if (row.type === "Debit") {
      if (number === 0);
      else number *= -1;
    }
  }
  return number;
};
const getBalance = (array, parentNormalSide) => {
  let balance = 0;
  if (array.length > 0)
    balance = array
      .map((row) => plusOrMinus(row, parentNormalSide))
      .reduce((total, amount) => amount + total);
  return balance;
};
const getTotal = (ids, filteredRows, parentNormalSide) => {
  const arr = filteredRows.filter((item) => ids.includes(item.id));
  const total = getBalance(arr, parentNormalSide);
  return total;
};

const AccountDetail = ({ onClose }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState({});
  const [eventRows, setEventRows] = useState([]);
  const apiRef = useGridApiRef();
  const { tableStyles, theme } = useThemeProvider();
  const { accountDetailPersistence, role, user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [total, setTotal] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const page = 10;
  const pageSizeOptions = [10, 20, 50, 100];
  const toLink = (row) => {
    return (
      <Link
        underline="hover"
        sx={linkStyle}
        component="button"
        onClick={() => {
          handleDrawerOpen(row);
        }}
      >
        {row.value}
      </Link>
    );
  };
  const toLink2 = (row) => {
    return (
      <Link
        underline="hover"
        sx={linkStyle}
        component="button"
        onClick={() => {}}
      >
        {row.value}
      </Link>
    );
  };
  const handleDrawerOpen = (row) => {
    setDrawerContent(eventRows.filter((item) => item.id === row.id)[0]);
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleTab = (newTab) => {
    setTab(newTab);
  };

  const viewTabs = [
    "Approved",
    "Pending",
    "Rejected",
    "All entries",
    "Event Log",
  ];
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
  const GridToolbar = () => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 3,
        backgroundColor:
          theme === "dark" ? "rgba(30, 27, 27, 0.745)" : "rgb(223, 223, 223)",
        pl: "16px",
      }}
    >
      {tab !== 4 && (
        <Button variant="contained" onClick={() => handleDialogOpen()}>
          Add Entries
        </Button>
      )}
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
      {tab !== 4 && (
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>{`Total: ${
          total >= 0
            ? toCurrency.format(total)
            : `(${toCurrency.format(total * -1)})`
        }`}</Typography>
      )}
    </Box>
  );
  const handleCellRender = (cell) => {
    switch (cell.row.field) {
      case "balance":
        return cell.value >= 0
          ? toCurrency.format(cell.value)
          : `(${toCurrency.format(cell.value * -1)})`;
      default:
        break;
    }
  };
  const eventColumns = [
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
      headerName: "Action",
      flex: 0.2,
      minWidth: 100,
      renderHeader: (param) => headerElement(param),
    },
    {
      field: "entryName",
      headerName: "Entry Name",
      type: "number",
      flex: 0.3,
      minWidth: 120,
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

  const columns = [
    {
      field: "id",
      headerName: "On date",
      type: "string",
      flex: 1,
      renderHeader: (param) => headerElement(param),
      renderCell: (row) => toLink2(row),
      minWidth: 420,
    },
    {
      field: "name",
      headerName: "Entry Name",
      flex: 0.3,
      minWidth: 200,
      renderHeader: (param) => headerElement(param),
    },
    {
      field: "type",
      headerName: "Type",
      headerAlign: "center",
      flex: 0.3,
      minWidth: 110,
      renderHeader: (param) => headerElement(param),
      renderCell: (row) => (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography textAlign={row.value === "Debit" ? "left" : "right"}>
            {row.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "total",
      headerName: "Amount",
      flex: 0.3,
      type: "number",
      minWidth: 150,
      renderHeader: (param) => headerElement(param),
      renderCell: (row) =>
        row.value >= 0
          ? toCurrency.format(row.value)
          : `(${toCurrency.format(row.value * -1)})`,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 0.5,
      minWidth: 250,
      renderHeader: (param) => headerElement(param),
    },
    {
      field: "status",
      headerName: "Status",
      type: role === "user" ? "string" : "singleSelect",
      editable: role === "admin" || role === "manager",
      minWidth: 130,
      flex: 0.2,
      renderHeader: (param) => headerElement(param),
      valueOptions: ["Approved", "Pending", "Rejected"],
    },
    {
      field: "comment",
      headerName: "Comment",
      editable: role === "admin" || role === "manager",
      flex: 0.5,
      minWidth: 250,
      renderHeader: (param) => headerElement(param),
    },
  ];
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
      await updateEntry(current, accountDetailPersistence.id, value);
      current.row[current.field] = value;
      const e = createEvent(user, current, "cell");
      createEntryEvent(e, accountDetailPersistence.id);
    }
    setRefresh((refresh) => !refresh);
  };

  useMemo(() => {
    setFilteredRows(() => {
      switch (tab) {
        case 1:
          return rows.filter((row) => row.status === "Pending");
        case 2:
          return rows.filter((row) => row.status === "Rejected");
        case 3:
          return rows;
        case 4:
          return [];
        default:
          return rows.filter((row) => row.status === "Approved");
      }
    });
  }, [tab, rows]);
  useEffect(() => {
    const id = accountDetailPersistence.id;
    const getDetails = async () => {
      const details = await getAllEntries(id);
      const rawData = [];
      details.map((detail) => rawData.push(detail.data()));
      // if (role === "admin") setRawData(rawData);
      const filteredData = [];
      rawData.map(
        (data, index) =>
          (filteredData[index] = {
            id: data.id,
            name: data.name,
            type: data.type,
            total: data.total,
            description: data.description,
            status: data.status,
            comment: data.comment,
          })
      );
      setRows(filteredData.sort(f));
      const balance = getBalance(
        filteredData.filter((row) => row.status === "Approved"),
        accountDetailPersistence.normalSide
      );
      setBalance(balance);
      updateAccountBalance(id, balance);
      const events = await getAllEntryEvents(id);
      const arr = [];
      events.map((event) => arr.push(event.data()));
      const formatedEvents = [];
      arr.map(
        (event, index) =>
          (formatedEvents[index] = {
            id: event.eventDate,
            username: event.user.username,
            type: event.change.type,
            entryName: event.change.row.name,
            field: event.change.field,
            currValue: event.change.field
              ? event.change.row[event.change.field]
              : "",
            preValue: event.change.previous ?? "",
          })
      );
      setEventRows(formatedEvents.sort(f));
    };
    getDetails();
  }, [refresh, role, accountDetailPersistence]);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        gap: "20px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme === "dark" ? "#121212" : "rgb(246, 243, 243)",
      }}
    >
      <Box
        sx={{
          pl: "25px",
          display: "flex",
          width: "100%",
          alignItems: "center",
          pt: "20px",
        }}
      >
        <Button onClick={() => onClose()} variant="outlined">
          <ArrowBackIcon /> Go Back
        </Button>
        <Typography
          variant="h4"
          sx={{ ml: "20px", fontWeight: "bold", flexGrow: 1 }}
        >
          Account details
        </Typography>
        <Typography variant="h5" sx={{ mr: "20px", fontWeight: "bold" }}>
          {`Account Balance: ${
            balance >= 0
              ? toCurrency.format(balance)
              : `(${toCurrency.format(balance * -1)})`
          }`}
        </Typography>
      </Box>
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
          value={tab}
          onChange={(e, n) => {
            handleTab(n);
          }}
        >
          {ViewTabs}
        </Tabs>
      </Box>
      <Box
        sx={{
          height: "83%",
          mb: "60px",
          minWidth: "100%",
          backgroundColor:
            theme === "dark"
              ? "rgba(41, 37, 37, 0.745)"
              : "rgb(246, 243, 243);",
        }}
      >
        <DataGrid
          apiRef={apiRef}
          slots={{
            toolbar: GridToolbar,
          }}
          rows={tab === 4 ? eventRows : filteredRows}
          columns={tab === 4 ? eventColumns : columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: page,
              },
            },
          }}
          onCellEditStop={(current, event) => updateCell(current, event)}
          pageSizeOptions={pageSizeOptions}
          checkboxSelection
          disableRowSelectionOnClick
          sx={tableStyles}
          onStateChange={() => {
            if (tab === 4) return;
            setTotal(
              getTotal(
                gridFilteredSortedRowIdsSelector(apiRef),
                filteredRows,
                accountDetailPersistence.normalSide
              )
            );
          }}
        />
        <Dialog
          TransitionComponent={Transition}
          fullScreen
          open={dialogOpen}
          onClose={() => handleDialogClose()}
        >
          <Toolbar>
            <IconButton
              id="menu-item"
              color="inherit"
              edge="start"
              onClick={() => handleDialogClose()}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <AddEntriesContent setRefresh={setRefresh} />
        </Dialog>
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
    </Box>
  );
};

export default AccountDetail;
