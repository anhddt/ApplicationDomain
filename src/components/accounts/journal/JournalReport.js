import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  Drawer,
  Grid,
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
  gridFilteredSortedRowIdsSelector,
  useGridApiRef,
} from "@mui/x-data-grid";
import { useThemeProvider } from "../../utils/themeProvider/CustomThemeProvier";
import {
  headerElement,
  linkStyle,
  toCurrency,
} from "../chartOfAccounts/ChartOfAccounts";
import { f } from "../eventsLog/EventLog";
import { Transition } from "../accountDetail/AccountDetail";
import AddEntriesContent from "../accountDetail/AddEntriesContent";
import EntryInfo from "../accountDetail/EntryInfo";
import {
  getEntry,
  getJournals,
} from "../../../middleware/firebase/FireStoreUtils";

const JournalReport = () => {
  const { theme, tableStyles } = useThemeProvider();
  const apiRef = useGridApiRef();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [rows, setRows] = useState([]);
  const [entries, setEntries] = useState([]);
  const [debits, setDebits] = useState(0);
  const [credits, setCredits] = useState(0);
  const page = 20;
  const pageSizeOptions = [5, 10, 20, 50, 100];
  const RenderAccount = (row) => {
    const [label1, setLabel1] = useState("");
    const [label2, setLabel2] = useState("");
    useEffect(() => {
      const e = row.row.entries;
      const getLabels = async () => {
        const l1 = await getEntry(e[0].parent, e[0].entry);
        const l2 = await getEntry(e[1].parent, e[1].entry);
        setLabel1(l1.parentLabel);
        setLabel2(l2.parentLabel);
      };
      getLabels();
    }, [row]);
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography>{label1}</Typography>
        <Typography>{label2}</Typography>
      </Box>
    );
  };
  const columns = [
    {
      field: "id",
      headerName: "On Date",
      renderHeader: (param) => headerElement(param),
      renderCell: (row) => toLink(row),
      type: "date",
      valueGetter: ({ value }) => new Date(value),
      flex: 1,
      width: 500,
    },
    {
      field: "entries",
      headerName: "Accounts",
      renderHeader: (param) => headerElement(param),
      renderCell: (row) => RenderAccount(row),
      hideable: false,
      flex: 0.7,
      width: 300,
    },
    {
      field: "debit",
      headerName: `Debit  ${toCurrency.format(debits)}`,
      renderHeader: (param) => headerElement(param),
      renderCell: (row) => renderDebit(row),
      width: 250,
    },
    {
      field: "credit",
      headerName: `Credit  ${toCurrency.format(credits)}`,
      renderHeader: (param) => headerElement(param),
      renderCell: (row) => renderCredit(row),
      width: 250,
    },
  ];
  const getTotal = (ids, rows) => {
    let total1 = 0;
    let total2 = 0;
    const arr = rows.filter((item) => ids.includes(item.id));
    arr.map((item) =>
      item.entries.map((entry) =>
        entry.type === "Debit"
          ? (total1 += Number(entry.amount))
          : (total2 += Number(entry.amount))
      )
    );
    setDebits(total1);
    setCredits(total2);
  };
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setRefresh((r) => !r);
  };

  const handleDrawerOpen = (row) => {
    const e = row.row.entries;
    const getEntries = async () => {
      const entry1 = await getEntry(e[0].parent, e[0].entry);
      const entry2 = await getEntry(e[1].parent, e[1].entry);
      const arr = [entry1, entry2];
      setEntries(arr);
    };
    getEntries();
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  useEffect(() => {
    const journals = async () => {
      const allJournals = await getJournals();
      setRows(allJournals.sort(f));
    };
    journals();
  }, [refresh]);
  // This components wraps the account's name within the link
  // Later when we click on the link it will redirect to the actual
  // account page/sheet with account details
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
        {new Date(row.value).toString()}
      </Link>
    );
  };
  const renderDebit = (row) => {
    const type1 = row.row.entries[0].type;
    const type2 = row.row.entries[1].type;
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        <Box sx={{ height: "50%", width: "100%" }}>
          <Typography>
            {type1 === "Debit" && toCurrency.format(row.row.entries[0].amount)}
          </Typography>
        </Box>
        <Box sx={{ height: "50%", width: "100%" }}>
          <Typography>
            {type2 === "Debit" && toCurrency.format(row.row.entries[1].amount)}
          </Typography>
        </Box>
      </Box>
    );
  };
  const renderCredit = (row) => {
    const type1 = row.row.entries[0].type;
    const type2 = row.row.entries[1].type;
    return (
      <Box sx={{ height: "100%", width: "100%" }}>
        <Box sx={{ height: "50%", width: "100%" }}>
          <Typography>
            {type1 === "Credit" && toCurrency.format(row.row.entries[0].amount)}
          </Typography>
        </Box>
        <Box sx={{ height: "50%", width: "100%" }}>
          <Typography>
            {type2 === "Credit" && toCurrency.format(row.row.entries[1].amount)}
          </Typography>
        </Box>
      </Box>
    );
  };
  const GridToolbar = () => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 3,
        backgroundColor:
          theme === "dark" ? "rgba(30, 27, 27, 0.745)" : "rgb(223, 223, 223)",
        pl: "16px",
        pt: "3px",
      }}
    >
      <Button variant="contained" onClick={() => handleDialogOpen()}>
        Add Entries
      </Button>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </Box>
  );
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        gap: "2px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme === "dark" ? "#121212" : "rgb(246, 243, 243)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme === "dark" ? "#121212" : "rgb(246, 243, 243)",
        }}
      >
        <Box
          sx={{
            pt: "24px",
            pl: "50px",
            pb: "24px",
            display: "flex",
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            sx={{ mt: "20px", ml: "20px", fontWeight: "bold", flexGrow: 1 }}
          >
            {" "}
            Journal
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          minWidth: "100%",
          backgroundColor: theme === "dark" ? "#121212" : "rgb(246, 243, 243)",
        }}
      >
        <DataGrid
          apiRef={apiRef}
          columns={columns}
          rows={rows}
          slots={{
            toolbar: GridToolbar,
          }}
          checkboxSelection
          disableRowSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: page,
              },
            },
          }}
          pageSizeOptions={pageSizeOptions}
          sx={tableStyles}
          onStateChange={() => {
            getTotal(gridFilteredSortedRowIdsSelector(apiRef), rows);
          }}
        />
      </Box>
      <Drawer
        anchor="bottom"
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
          <Toolbar sx={{ boxShadow: 5 }}>
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
        <Grid
          container
          sx={{
            p: "50px",
            backgroundColor:
              theme === "dark"
                ? "rgba(30, 27, 27, 0.745)"
                : "rgb(223, 223, 223)",
          }}
        >
          <EntryInfo entries={entries} />
        </Grid>
      </Drawer>
      <Dialog
        TransitionComponent={Transition}
        fullScreen
        open={dialogOpen}
        onClose={() => handleDialogClose()}
      >
        <Toolbar sx={{ boxShadow: 5 }}>
          <IconButton
            id="menu-item"
            color="inherit"
            edge="start"
            onClick={() => handleDialogClose()}
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: "50px", fontWeight: "bold" }} variant="h4">
            Create entry
          </Typography>
        </Toolbar>
        <AddEntriesContent />
      </Dialog>
    </Box>
  );
};

export default JournalReport;