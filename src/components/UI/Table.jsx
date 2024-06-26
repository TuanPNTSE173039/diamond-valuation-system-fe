import DeleteIcon from "@mui/icons-material/Delete";
import { TablePagination } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { Link } from "react-router-dom";
import {
  EnhancedTableHead,
  EnhancedTableToolbar,
} from "../../assets/styles/Table.jsx";
import { getComparator, stableSort } from "../../utilities/table.js";

export default function UITable({
  heading,
  rows = [],
  headCells = [],
  children,
  readOnly = false,
  selectedAction = (
    <IconButton>
      <DeleteIcon />
    </IconButton>
  ),
  selected = [],
  setSelected,
  page,
  setPage,
  count,
  rowsPerPage,
  setRowsPerPage,
}) {
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("Date");
  // const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  // const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.number);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - count) : 0;

  const visibleRows = React.useMemo(
    () =>
      // stableSort(rows, getComparator(order, orderBy)).slice(
      //   page * rowsPerPage,
      //   page * rowsPerPage + rowsPerPage,
      // ),
      stableSort(rows, getComparator(order, orderBy)),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: "100%", mt: 3 }}>
      <Paper elevation={3} sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          heading={heading}
          action={selectedAction}
        >
          {children}
        </EnhancedTableToolbar>

        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
              // readOnly={readOnly}
            />
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={headCells.length}
                    sx={{ p: 3, fontSize: 20 }}
                  >
                    There are no items is shown in this table
                  </TableCell>
                </TableRow>
              ) : (
                visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.number);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.number)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      {headCells.map((headCell) => (
                        <TableCell
                          key={headCell.id}
                          align={headCell.numeric ? "right" : "left"}
                          padding={headCell.disablePadding ? "none" : "normal"}
                        >
                          {readOnly && row[headCell.id]}
                          {!readOnly && (
                            <Link to={`${row.number}`}>{row[headCell.id]}</Link>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 35]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
