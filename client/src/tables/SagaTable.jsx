import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';

const SagaTable = ({ saga }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Codice</TableCell>
            <TableCell>Contenuto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {saga.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.codice}</TableCell>
              <TableCell>{row.contenuto}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SagaTable;
