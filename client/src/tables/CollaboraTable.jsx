import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';

const CollaboraTable = ({ collabora }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Contenuto</TableCell>
            <TableCell>Membro</TableCell>
            <TableCell>Ruolo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {collabora.map((c, index) => (
            <TableRow key={index}>
              <TableCell>{c.contenuto}</TableCell>
              <TableCell>{c.membro}</TableCell>
              <TableCell>{c.ruolo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollaboraTable;
