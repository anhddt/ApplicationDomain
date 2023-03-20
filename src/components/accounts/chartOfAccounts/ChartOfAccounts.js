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

const headerElement = (param) => (
  <Typography sx={{ fontWeight: "bold" }} variant="subtitle1">
    {param.colDef.headerName}
  </Typography>
);
const ChartOfAccounts = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { tableStyles, theme } = useThemeProvider();
  const page = 5;
  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
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
      maxWidth: 180,
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
  const pageSizeOptions = [5, 10, 20, 50, 100];
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
        borderRadius: "4px",
        boxShadow: "0 0 15px 0 rgba(0, 0, 0, 0.832)",
        height: 401,
        maxHeight: 500,
        width: "100%",
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
