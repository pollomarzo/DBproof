import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';

const EpisodesTable = ({ episodes }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Numero</TableCell>
            <TableCell>Contenuto</TableCell>
            <TableCell>Stagione</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Descrizione</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {episodes.map((account, index) => (
            <TableRow key={index}>
              <TableCell>{account.numero}</TableCell>
              <TableCell>{account.codice_contenuto}</TableCell>
              <TableCell>{account.stagione}</TableCell>
              <TableCell>{account.nome}</TableCell>
              <TableCell>{account.descrizione}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EpisodesTable;
