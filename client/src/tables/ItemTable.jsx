import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';

const ItemTable = ({ items }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Codice</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Anno</TableCell>
            <TableCell>Descrizione</TableCell>
            <TableCell>Tipo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.codice}</TableCell>
              <TableCell>{item.nome}</TableCell>
              <TableCell>{item.anno}</TableCell>
              <TableCell>{item.descrizione}</TableCell>
              <TableCell>{item.kind}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemTable;
