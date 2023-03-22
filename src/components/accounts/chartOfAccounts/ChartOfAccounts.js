import { useState } from "react";
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

const toCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const linkStyle = {
  color: "primary.main",
  fontSize: "14px",
};

// This components wraps the account's name within the link
// Later when we click on the link it will redirect to the actual
// account page/sheet with account details
const toLink = (value, f) => {
  return (
    <Link
      underline="hover"
      sx={linkStyle}
      component="button"
      onClick={() => f()}
    >
      {value}
    </Link>
  );
};

//This styles the tital, category, subtitle, etc. go
const headerElement = (param) => (
  <Typography sx={{ fontWeight: "bold" }} variant="subtitle1">
    {param.colDef.headerName}
  </Typography>
);

/**
 * This renders the table with differnt accounts
 * @returns
 */
const ChartOfAccounts = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { tableStyles, theme } = useThemeProvider();
  const page = 10;
  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  /**
   * This makes the header of the table
   */
  const columns = [
    {
      field: "id",
      headerName: "ID",
      renderHeader: (param) => headerElement(param),
      width: 90,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
      renderHeader: (param) => headerElement(param),
      renderCell: (param) => toLink(param.value),
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
      type: "number",
      maxWidth: 130,
      flex: 1,
      renderHeader: (param) => headerElement(param),
      valueFormatter: ({ value }) => value && toCurrency.format(value),
    },
    {
      field: "action",
      headerName: "Action",
      type: "singleSelect",
      editable: true,
      maxWidth: 180,
      flex: 1,
      renderHeader: (param) => headerElement(param),
      valueOptions: ["None", "View history", "Request Approval"],
    },
  ];

  const data = (id, name, category, subCat, balance, action) => {
    return { id, name, category, subCat, balance, action };
  };
  // In the future this will just be an array pulled off from the database
  const rows = [
    data(1, "Account1", "Expense", "Owner Expense", 200, "None"),
    data(2, "Account2", "Income", "Account Receivable", 200, "None"),
    data(3, "Account3", "Loan", "Credit Card", 1000, "None"),
    data(4, "Account4", "Investment", "Owner Investment", 1000, "None"),
    data(5, "Account5", "Other", "Goodwill", 1000, "None"),
    data(6, "Account6", "Another", "Some Account", 1000, "None"),
    data(7, "Account7", "Another", "Some Account", 1000, "None"),
    data(8, "Account8", "Another", "Some Account", 1000, "None"),
    data(9, "Account9", "Another", "Some Account", 1000, "None"),
    data(10, "Account10", "Another", "Some Account", 1000, "None"),
    data(11, "Account11", "Another", "Some Account", 1000, "None"),
    data(12, "Account12", "Another", "Some Account", 1000, "None"),
    data(13, "Account13", "Another", "Some Account", 1000, "None"),
  ];
  // This allows the user to choose how many rows to display on each page
  const pageSizeOptions = [10, 20, 50, 100];
  const GridToolbar = (props) => (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        backgroundColor:
          theme === "dark" ? "rgba(30, 27, 27, 0.745)" : "rgb(223, 223, 223)",
        pl: "16px",
      }}
    >
      <Button variant="contained" onClick={() => handleDrawer()}>
        Add Account
      </Button>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </Box>
  );

  return (
    <Box
      sx={{
        height: "83%",
        mb: "60px",
        width: "100%",
        backgroundColor:
          theme === "dark" ? "rgba(41, 37, 37, 0.745)" : "rgb(246, 243, 243);",
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
        onClose={() => handleDrawer()}
        sx={{ zIndex: 1202 }}
      >
        <Toolbar>
          <IconButton
            id="menu-item"
            color="inherit"
            edge="start"
            onClick={() => handleDrawer()}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <AddAccountContent />
      </Drawer>
    </Box>
  );
};

export default ChartOfAccounts;
