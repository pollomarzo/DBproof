import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';

const WatchTable = ({ watch }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Profilo</TableCell>
            <TableCell>Account</TableCell>
            <TableCell>Contenuto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {watch.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.profilo}</TableCell>
              <TableCell>{row.account}</TableCell>
              <TableCell>{row.contenuto}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WatchTable;
