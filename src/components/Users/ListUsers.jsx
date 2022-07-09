import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@mui/material/TableHead";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchBar from "material-ui-search-bar";

import ManageUser from "./ManageUser";
import AddUser from "./AddUser";
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function Row(props) {
  const { row, handleManageUserOpen } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        onClick={() => setOpen(!open)}
        style={{ cursor: "pointer" }}
      >
        <TableCell>
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.role}</TableCell>
        <TableCell />
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <button
                    className="btn btn-primary me-3"
                    onClick={() => {
                      handleManageUserOpen(row.id);
                    }}
                  >
                    Manage User
                  </button>
                  <button id={row.id} className="btn btn-info me-3">
                    View Vacations
                  </button>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function ListUsers() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [searched, setSearched] = React.useState("");
  const [originalRows, setOriginalRows] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  const requestSearch = (searchedVal) => {
    const filteredRows = originalRows.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  //List users state
  React.useEffect(() => {
    let userToken = JSON.parse(localStorage.getItem("userData")).token;

    const axios = require("axios");
    async function makeRequest() {
      const config = {
        method: "get",
        url: `http://${window.location.hostname}:8000/api/users`,
        headers: { Authorization: `Bearer ${userToken}` },
      };

      let res = await axios(config).catch((err) => {
        console.log(err.response.statusText);
      });

      let usersResArr = res.data.data;
      let usersArr = [];
      usersResArr.forEach((user) => {
        usersArr.push({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role.name,
        });
      });
      setOriginalRows([...usersArr]);
      setRows([...usersArr]);
    }
    makeRequest();
  }, []);
  //List users state

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Add User dialog //
  const [openAddUserDialog, setOpenAddUserDialog] = React.useState(false);
  const handleAddUserOpen = () => setOpenAddUserDialog(true);
  const handleAddUserClose = () => setOpenAddUserDialog(false);
  // Add User dialog //

  // Manage User dialog //
  const [managedUserLoaded, setManagedUserLoaded] = React.useState(false);
  const [openManageUserDialog, setOpenManageUserDialog] = React.useState(false);
  const [managedUserData, setManagedUserData] = React.useState({ role: "" });
  const handleManageUserOpen = (userId) => {
    let userToken = JSON.parse(localStorage.getItem("userData")).token;

    // Getting managed user data//
    const axios = require("axios");
    async function makeRequest() {
      const config = {
        method: "get",
        url: `http://${window.location.hostname}:8000/api/users/${userId}`,
        headers: { Authorization: `Bearer ${userToken}` },
      };

      let res = await axios(config).catch((err) => {
        console.log(err.response.statusText);
      });
      setManagedUserData(res.data.data);
      setManagedUserLoaded(true);
    }
    makeRequest();
    setOpenManageUserDialog(true);
  };
  const handleManageUserClose = () => setOpenManageUserDialog(false);
  // Manage User dialog //

  // Rendering the component
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <AddUser open={openAddUserDialog} onClose={handleAddUserClose} />
        {managedUserLoaded && (
          <ManageUser
            open={openManageUserDialog}
            onClose={handleManageUserClose}
            managedUserData={managedUserData}
          />
        )}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="h3 text-center">Users table</div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell />
                <TableCell>
                  <p className="h5">ID</p>
                </TableCell>
                <TableCell>
                  <p className="h5">Name</p>
                </TableCell>
                <TableCell>
                  <p className="h5">Email</p>
                </TableCell>
                <TableCell>
                  <p className="h5">Role</p>
                </TableCell>
                <TableCell>
                  <SearchBar
                    value={searched}
                    onChange={(searchVal) => requestSearch(searchVal)}
                    onCancelSearch={() => cancelSearch()}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <Row
                  key={row.name}
                  row={row}
                  handleManageUserOpen={handleManageUserOpen}
                />
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10]}
                  colSpan={6}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </ThemeProvider>

      <button
        className="btn btn-success mt-3"
        onClick={() => handleAddUserOpen()}
      >
        Add User
      </button>
    </>
  );
}
