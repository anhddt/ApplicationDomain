import { useThemeProvider } from "../../utils/themeProvider/CustomThemeProvier";
import { Box, Link, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

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
  const { tableStyles } = useThemeProvider();
  const page = 5;
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
      flex: 1,
      width: 150,
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
      width: 160,
      renderHeader: (param) => headerElement(param),
      valueFormatter: ({ value }) => value && toCurrency.format(value),
    },
    {
      field: "action",
      headerName: "Action",
      type: "singleSelect",
      editable: true,
      width: 160,
      renderHeader: (param) => headerElement(param),
      valueOptions: ["None", "View history", "Request Approval"],
    },
  ];

  const data = (id, name, category, subCat, balance, action) => {
    return { id, name, category, subCat, balance, action };
  };

  const pageSizeOptions = [5, 10, 20, 50, 100];

  const rows = [
    data(1, "Account1", "Expense", "Account Payable", 200, "None"),
    data(2, "Account2", "Revenue", "Account Receivable", 200, "None"),
    data(3, "Account2", "Revenue", "Account Receivable", 1000, "None"),
    data(4, "Account2", "Revenue", "Account Receivable", 1000, "None"),
    data(5, "Account2", "Revenue", "Account Receivable", 1000, "None"),
    data(6, "Account2", "Revenue", "Account Receivable", 1000, "None"),
    data(7, "Account2", "Revenue", "Account Receivable", 1000, "None"),
    data(8, "Account2", "Revenue", "Account Receivable", 1000, "None"),
    data(9, "Account2", "Revenue", "Account Receivable", 1000, "None"),
    data(10, "Account2", "Revenue", "Account Receivable", 1000, "None"),
    data(11, "Account2", "Revenue", "Account Receivable", 1000, "None"),
    data(12, "Account2", "Revenue", "Account Receivable", 1000, "None"),
    data(13, "Account2", "Revenue", "Account Receivable", 1000, "None"),
  ];
  return (
    <Box
      sx={{
        borderRadius: "4px",
        boxShadow: "0 0 15px 0 rgba(0, 0, 0, 0.832)",
        height: 369,
        maxHeight: 500,
        width: "100%",
      }}
    >
      <DataGrid
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
    </Box>
  );
};

export default ChartOfAccounts;
