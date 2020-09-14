import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

const DataTable = ({rows}) => {
    return (
        <Table size="small" aria-label="user data table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Pass</TableCell>
            <TableCell align="right">Accounts</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell align="right">{row.username}</TableCell>
              <TableCell align="right">{row.password}</TableCell>
              <TableCell align="right">{row.accounts.size}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
}

export default DataTable;