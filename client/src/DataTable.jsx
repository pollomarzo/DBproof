import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';

const DataTable = ({ head, body }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {head.map((cell, index) => (
              <TableCell key={index}>{cell}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {body.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell component="th" scope="row">
                #{rowIndex}
              </TableCell>
              {row.map((cell, index) => (
                <TableCell key={index} component="th" scope="row">
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
